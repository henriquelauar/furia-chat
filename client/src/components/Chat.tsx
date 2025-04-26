import { Form } from "react-bootstrap";
import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { useUsername } from "../hooks/useUsername";
import panteraLogo from '../assets/furia-logo.jpg'
import avatar from '../assets/avatar.jpg'


export default function Chat() {
  const { messages, sendMessage, endRef } = useChat();
  const [input, setInput] = useState("");

  const username = useUsername();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input, username);
    setInput("");
  };

  const handlePantera = async () => {
    await sendMessage(
      "Pantera, quando é o próximo jogo?",
      "Você"
    );

    // Simulação da resposta da Pantera (poderia ser um backend futuramente)
    setTimeout(() => {
      sendMessage(
        "O próximo confronto da FURIA é dia 27/04 às 18h contra a NAVI! 🐾",
        "Pantera"
      );
    }, 1500);
  };

  return (
    <div className="d-flex flex-column w-100" style={{ backgroundColor: "#f8f9fa", height: "calc(100vh - 66px)"}}>
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
          Chamar a Pantera 🐾
        </button>
      </div>

      {/* Mensagens */}
      <div className="flex-grow-1 overflow-auto p-3 overflow-auto" style={{minHeight: 0}}>
        {messages.map((msg, idx) => {
          const isUser = msg.sender === "Você";
          const isBot = msg.sender === "Pantera";
          return (
            <div
              key={idx}
              className={`mb-3 d-flex ${isUser ? "justify-content-end" : "justify-content-start"}`}
            >
              <div className="d-flex align-items-center" style={{ maxWidth: "75%" }}>
                {!isUser && isBot &&  (
                  <img
                    src={panteraLogo}
                    alt={msg.sender}
                    width="36"
                    height="36"
                    className="rounded-circle me-2"
                  />
                )}
                {!isUser && !isBot && (
                  <img
                  src={avatar}
                  alt={msg.sender}
                  width="36"
                  height="36"
                  className="rounded-circle me-2"
                />
                )}
                <div
                  className="p-3 rounded shadow-sm text-white"
                  style={{
                    backgroundColor: isUser ? "#000000d4" : "#000000d4",
                    borderRadius: "1rem",
                  }}
                >
                  <small className="d-block fw-bold text-uppercase mb-1">
                    {msg.sender}
                  </small>
                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                </div>
                {isUser && (
                  <img
                  src={avatar}
                  alt={msg.sender}
                  width="36"
                  height="36"
                  className="rounded-circle ms-2"
                />
                )}
              </div>
            </div>
          );
        })
          
        }

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
          className="text-white flex-grow-1"
          style={{ backgroundColor: "#000000d4"}}
        />
        <button type="submit" className="btn" style={{ backgroundColor: "#000000d4" }}>
          <i className="ri-send-plane-fill text-white" />
        </button>
      </Form>
    </div>
  );
}