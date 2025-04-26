import { useNavigate } from "react-router-dom";
import banner from "../assets/background-furia.jpeg";
import Header from "../components/Header"

export default function Home() {
  const navigate = useNavigate();

  return (
      <div className="d-flex flex-column min-vh-100">
        <Header/>
        <div className="text-white d-flex flex-column flex-grow-1 align-items-center text-center">
            {/* Banner */}
            <div className="w-100 mb-4">
                <img
                src={banner}
                alt="Banner FURIA"
                className="img-fluid shadow object-fit-cover w-100"
                style={{
                    maxHeight: "400px",
                }}
                />
            </div>

            {/* Título e descrição */}
            <h4 className="text-black mb-3">BEM VINDO AO CHAT FÚRIA</h4>
            <p className="text-black mb-4" style={{ maxWidth: "550px" }}>
                Converse com a Pantera e fique por dentro do universo da FURIA! Um espaço para fãs
                curiosos e apaixonados por CS:GO se conectarem com o time de forma inovadora.
            </p>

            {/* Botão para o Chat */}
            <button className="btn btn-dark" onClick={() => navigate("/chat")}>
                ACESSAR O CHAT
            </button>
        </div>
        <footer className="d-flex flex-column justify-content-between align-items-center px-4 py-3 mt-5 border border-top-1">
            <div className="text-black text-center">
                CHAT FURIA © 2025
            </div>
            <div className="mb-2 mb-sm-0 d-flex gap-3">
                <a href="https://twitter.com/furiagg" className="text-black">
                    <i className="bi bi-twitter fs-5" />
                </a>
                <a href="https://instagram.com/furiagg" className="text-black">
                    <i className="bi bi-instagram fs-5" />
                </a>
                <a href="https://youtube.com/c/furia" className="text-black">
                    <i className="bi bi-youtube fs-5" />
                </a>
                <a href="https://wa.me/5511993404466" className="text-black">
                    <i className="bi bi-whatsapp fs-5" />
                </a>
            </div>
        </footer>
    </div>
  );
}
