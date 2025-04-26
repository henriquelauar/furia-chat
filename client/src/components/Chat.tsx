import { Form } from "react-bootstrap";

export default function Chat() {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column flex-grow-1 w-100 p-3 bg-white">

        {/* Header do Chat */}
        <div className="mb-4 text-center border-bottom pb-3">
          <h5 className="text-black fw-lighter mb-1">CHAT FURIA</h5>  
          <small className="text-light-emphasis fw-semibold">Fale com a Pantera Oficial</small>
        </div>

        {/* Corpo do Chat */}
        <div className="mb-4 p-3 rounded shadow-sm bg-dark text-white">
          <div className="d-flex align-items-start">
            <i className="bi bi-chat-dots-fill fs-4 me-3 text-warning"></i>
            <div>
              <h6 className="fw-bold text-uppercase mb-1">Pantera diz:</h6>
              <p className="mb-0" style={{ lineHeight: "1.5" }}>
                Fala, fã da FURIA! 🐾<br />
                Eu sou a Pantera, sua guia nesse universo. Aqui você pode tirar dúvidas, relembrar momentos históricos,
                saber mais sobre os jogadores ou descobrir quando e onde será o próximo confronto da tropa. Bora conversar? 👊
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Campo de Entrada */}
      <Form
        className="d-flex gap-1 flex-column flex-sm-row p-3 bg-white border border-top-1" onSubmit={ (e) => {e.preventDefault(); }}>
        <Form.Control type="text" placeholder="Digite sua mensagem..." className="text-white bg-dark flex-grow-1 " />
        <button type="submit" className="btn btn-dark" >
          <i className="ri-send-plane-fill"/>
        </button>
      </Form>
    </div>
  );
}
