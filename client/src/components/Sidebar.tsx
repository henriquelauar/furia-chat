import { FC, useEffect } from "react";
import { logout } from "../services/authService";
import { PrivateChatList } from "./PrivateChatList";
import { useUsername } from "../hooks/useUsername";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const Sidebar: FC = () => {
  const username = useUsername();
  const navigate = useNavigate();

  useEffect(() => {
    const hasShownPanteraMessage = localStorage.getItem("panteraToastShown");

    if (!hasShownPanteraMessage) {
      toast("Para conversar com a Pantera, comece sua mensagem com 'Pantera'");
      localStorage.setItem("panteraToastShown", "true");
    }
  }, []);

  const handleLogout = async () => {
    const confirmed = window.confirm("Tem certeza que deseja sair?");
    if (!confirmed) return;  
    logout();
    navigate('/')
  };

  return (
    <div
      className="d-none d-md-flex flex-column text-white position-sticky bg-white top-0 border-top shadow-sm border"
      style={{
        width: "350px",
        minWidth: "350px",
        padding: "2rem 1.5rem",
        zIndex: 1000,
        overflowY: 'auto'
      }}
    >

      {/* HEADER */}
      <div className="text-left">
          <div className="p-2 rounded shadow-sm h-100 d-flex flex-column justify-content-center" style={{ borderLeft: "4px solid #000000", backgroundColor: "#212529" }}>
            <div className="d-flex align-items-center justify-content-between">
              <small className="text-uppercase" style={{ fontSize: "0.75rem" }}>USERNAME</small>
                <button className="bi bi-box-arrow-in-right fs-5 btn btn-sm text-white" onClick={handleLogout}></button>
            </div>
            <strong>{username}</strong>
          </div>
      </div>

      <div className="text-left">
          <div className="p-2 rounded shadow-sm h-100 d-flex flex-column justify-content-center mt-3" style={{ borderLeft: "4px solid #000000", backgroundColor: "#212529" }}>
            <div className="d-flex align-items-center justify-content-between">
              <small>Para conversar com a Pantera, comece sua mensagem com "Pantera" e pergunte o que quiser!</small>
            </div>
          </div>
      </div>

      {/* DIRECT MESSAGES */}
      <div className="mb-4 text-left mt-5">
        <h5 className="fw-lighter mb-3 text-black" style={{ fontSize: '1rem' }}>Direct Messages</h5>
        <div style={{ maxHeight: '45vh', overflowY: 'auto' }}>
          <PrivateChatList />
        </div>
      </div>

      {/* Redes Sociais */}
      <div className="mt-auto text-center">
        <h6 className="fw-light mb-3 text-uppercase text-black">
          Acompanhe
        </h6>
        <div className="d-flex justify-content-center gap-3">
          <a href="https://twitter.com/furiagg" className="text-black">
            <i className="bi bi-twitter fs-5" />
          </a>
          <a href="https://instagram.com/furiagg" className="text-black">
            <i className="bi bi-instagram fs-5" />
          </a>
          <a href="https://youtube.com/c/FURIAgg" className="text-black">
            <i className="bi bi-youtube fs-5" />
          </a>
          <a href="https://wa.me/5511993404466" className="text-black">
            <i className="bi bi-whatsapp fs-5" />
          </a>
        </div>
      </div>
    </div>
  );
};
