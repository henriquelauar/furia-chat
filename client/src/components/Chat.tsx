import { Form } from "react-bootstrap";
import { useState } from "react";
import avatar from '../assets/avatar.jpg'
import panteraLogo from '../assets/furia-logo.jpg'
import { Message } from "../types";
import { usePanteraResponse } from "../hooks/usePantera";
import './chat.css'

interface ChatProps {
  messages: Message[];
  sendMessage: (content: string, sender?: string) => Promise<void>;
  removeMessage: (id: string) => Promise<void>;
  endRef: React.RefObject<HTMLDivElement | null>;
  username: string;
}

export default function Chat({ messages, sendMessage, removeMessage, endRef, username }: ChatProps) {
  const [input, setInput] = useState("");
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const { response: getPanteraResponse } = usePanteraResponse();

  if (!username) {
    return null;
  }

  // Trata e envia as mensagens para o supabase, gera a resposta da IA.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    await sendMessage(trimmed, username);
    setInput("");

    if (trimmed.toLowerCase().startsWith("pantera,")) {
      const panteraReply = await getPanteraResponse(trimmed);
      await sendMessage(panteraReply, "Pantera");
    }
  };

  // Deleta a mensagem selecionada
  const handleDeleteMessage = async (id: string) => {
    const confirmed = window.confirm("Tem certeza que quer excluir esta mensagem?");
    if (!confirmed) return;

    // Remove o id do estado local
    setDeletingIds(prev => [...prev, id]);
    setTimeout(async () => {
      await removeMessage(id);
      setDeletingIds(prev => prev.filter(msgId => msgId !== id));
    }, 500);
  };
  
  return (
    <div className="d-flex flex-column w-100 overflow-hidden chat-container">
      <div className="flex-grow-1 overflow-auto p-3 messages-container">
        {messages.map((msg) => {
          const isUser = msg.sender === username;
          const isBot = msg.sender === "Pantera";

          return (
            <div key={msg.id} className={`mb-2 d-flex ${isUser ? "justify-content-end" : "justify-content-start"} ${deletingIds.includes(msg.id) ? "fade-out" : ""}`}>
              <div className="d-flex align-items-center" style={{ maxWidth: "75%" }}>
                <div className="p-3 rounded shadow-sm text-white chat-bubble">
                  <div className="d-flex align-items-center mb-3">
                    {/* Avatar logo usuário chat */}
                    {!isUser && !isBot && ( <img src={avatar} alt={msg.sender} width="30" height="30" className="rounded-circle me-2" />)}
                    {/* Pantera Logo */}
                    {!isUser && isBot && ( <img src={panteraLogo} alt={msg.sender} width="30" height="30" className="rounded-circle me-2" /> )}
                      <div className="d-flex align-items-center column w-100">
                        {/* Avatar Logo usuário logado */}
                        {isUser && ( <img src={avatar} alt={msg.sender} width="30" height="30" className="rounded-circle me-2" /> )}
                        <small className="d-block fw-bold text-uppercase">{msg.sender}</small>
                      </div>
                  {isUser && ( <i className="bi bi-trash text-danger" role="button" onClick={() => handleDeleteMessage(msg.id)}/> )}
                  </div>
                <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>

      <Form className="d-flex gap-2 flex-sm-row flex-sm-row align-items-center p-3 border-top" onSubmit={handleSubmit} >
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="text-white flex-grow-1 chat-input"
        />
        <button type="submit" className="btn d-flex align-items-center justify-content-center send-button">
          <i className="ri-send-plane-fill text-white" />
        </button>
      </Form>

    </div>
  );
}
