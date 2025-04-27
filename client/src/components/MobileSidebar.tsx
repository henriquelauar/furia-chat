import { FC } from "react";
import { logout } from "../services/authService";
import { PrivateChatList } from "./PrivateChatList";
import { useUsername } from "../hooks/useUsername";

export const MobileSidebar: FC = () => {
  const username = useUsername();

  const handleLogout = async () => {
    const confirmed = window.confirm("Tem certeza que deseja sair?");
    if (!confirmed) return;
    logout();
  };

  return (
    <div
      className="offcanvas offcanvas-start bg-white text-dark"
      tabIndex={-1}
      id="mobileSidebar"
      aria-labelledby="mobileSidebarLabel"
      style={{maxWidth: "250px"}}
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title" id="mobileSidebarLabel">
          Menu
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column" style={{ overflowY: "auto" }}>
        
        {/* HEADER */}
        <div className="text-left mb-4">
          <div
            className="p-2 rounded shadow-sm h-100 d-flex flex-column justify-content-center mt-3"
            style={{
              borderLeft: "4px solid #000000",
              backgroundColor: "#212529",
            }}
          >
            <div className="d-flex align-items-center justify-content-between">
              <small
                className="text-uppercase"
                style={{ fontSize: "0.75rem", color: "#fff" }}
              >
                USERNAME
              </small>
              <button
                className="bi bi-box-arrow-in-right fs-5 btn btn-sm text-white"
                onClick={handleLogout}
              ></button>
            </div>
            <strong className="text-white">{username}</strong>
          </div>
        </div>

        {/* DIRECT MESSAGES */}
        <div className="mb-4 text-left mt-3">
          <h5 className="fw-lighter mb-3 text-black" style={{ fontSize: "1rem" }}>
            Direct Messages
          </h5>
          <PrivateChatList />
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
            <a href="https://youtube.com/c/furia" className="text-black">
              <i className="bi bi-youtube fs-5" />
            </a>
            <a href="https://wa.me/5511993404466" className="text-black">
              <i className="bi bi-whatsapp fs-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
