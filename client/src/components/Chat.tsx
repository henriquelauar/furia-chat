import { Form } from "react-bootstrap";
import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { useUsername } from "../hooks/useUsername";
import { usePanteraResponse } from "../hooks/usePantera";
import panteraLogo from '../assets/furia-logo.jpg'
import avatar from '../assets/avatar.jpg'
import './chat.css'


export default function Chat() {
  const { messages, sendMessage, endRef, removeMessage } = useChat();
  const [input, setInput] = useState("");
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const username = useUsername();
  const { response: getPanteraResponse } = usePanteraResponse();

  if (!username) {
    return null;
  }

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

  const handlePantera = async () => {
    const question = "Pantera, quando é o próximo jogo?";
    await sendMessage(question, username);
  
    const reply = await getPanteraResponse(question);
    await sendMessage(reply, "Pantera");
  };  

  const handleDeleteMessage = async (id: string) => {
    const confirmed = window.confirm("Tem certeza que quer excluir esta mensagem?");
    if (!confirmed) return;
  
    setDeletingIds(prev => [...prev, id]); // adiciona o id para animar o fade-out
  
    setTimeout(async () => {
      await removeMessage(id); // apaga do Supabase
      setDeletingIds(prev => prev.filter(msgId => msgId !== id)); // tira o id da lista
    }, 500); // tempo para o fade-out rodar (meio segundo)
  };
  

  return (
    <div className="d-flex flex-column w-100 overflow-hidden" style={{ backgroundColor: "#f8f9fa",height: "calc(100vh - 66px)" }}>

      {/* Header */}
      <div className="text-center py-3 border-bottom">
        <h5 className="text-black fw-lighter mb-1">CHAT FURIA</h5>
        <small className="text-light-emphasis fw-semibold">
          Fale com a Pantera Oficial
        </small>
      </div>

      {/* Botão chamar Pantera */}
      <div className="text-center py-2 border-bottom">
        <button className="btn btn-sm btn-dark" onClick={handlePantera}>
          Chamar a Pantera
        </button>
      </div>

      {/* Mensagens */}
      <div className="flex-grow-1 overflow-auto p-3" style={{ minHeight: 0 }}>
        {messages.map((msg) => {
          const isUser = msg.sender === username;
          const isBot = msg.sender === "Pantera";

          return (
            <div
              key={msg.id}
              className={`mb-3 d-flex ${isUser ? "justify-content-end" : "justify-content-start"} ${deletingIds.includes(msg.id) ? "fade-out" : ""}`}
            >
              <div className="d-flex align-items-center" style={{ maxWidth: "50%" }}>
                {!isUser && isBot && (
                  <img src={panteraLogo} alt={msg.sender} width="36" height="36" className="rounded-circle me-2" />
                )}
                {!isUser && !isBot && (
                  <img src={avatar} alt={msg.sender} width="36" height="36" className="rounded-circle me-2" />
                )}

                <div
                  className="p-3 rounded shadow-sm text-white"
                  style={{
                    backgroundColor: "#000000d4",
                    borderRadius: "1rem",
                    wordBreak: "break-word"
                  }}
                >
                  <div className="d-flex justify-content-between mb-3">
                    <small className="d-block fw-bold text-uppercase mb-1">{msg.sender}</small>
                    {isUser && (
                      <i
                        className="bi bi-trash text-danger"
                        role="button"
                        onClick={() => handleDeleteMessage(msg.id)}
                      />
                    )}
                  </div>

                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                </div>

                {isUser && (
                  <img src={avatar} alt={msg.sender} width="36" height="36" className="rounded-circle ms-2" />
                )}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <Form
        className="d-flex gap-1 flex-column flex-sm-row p-3 border-top"
        onSubmit={handleSubmit}
      >
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="text-white flex-grow-1 chat-input"
          style={{ backgroundColor: "#000000d4" }}
        />
        <button type="submit" className="btn" style={{ backgroundColor: "#000000d4" }}>
          <i className="ri-send-plane-fill text-white" />
        </button>
      </Form>
    </div>
  );
}