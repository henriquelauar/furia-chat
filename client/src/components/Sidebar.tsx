import { FC } from "react";

export const Sidebar: FC = () => {
  const stats = [
    { label: "World Ranking", value: "#11" },
    { label: "Win Rate", value: "63%" },
    { label: "Torneios Vencidos", value: "8" },
    { label: "Streak Atual", value: "3 Vitórias" },
  ];

  const matches = [
    { title: '23/04 - IEM Katowice 2025', team: 'FURIA vs Team Liquid' },
    { title: '25/04 - ESL Pro League', team: 'FURIA vs NAVI' },
  ];

  return (
    <div
      className="d-none d-md-flex flex-column text-white position-sticky bg-white top-0 border-top shadow-sm border"
      style={{
        width: "435px",
        padding: "2rem 1.5rem",
        zIndex: 1000,
      }}
    >
      
      {/* Stats */}
      <div className="mb-4 text-center mt-5">
        <h5 className="fw-lighter mb-3 text-uppercase text-black">
          <i className="ri-bar-chart-line me-2"></i>Stats
        </h5>
        <div className="row g-3">
          {stats.map((stat, idx) => (
            <div className="col-6" key={idx}>
              <div className="p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-center" style={{ borderLeft: "4px solid #000000", backgroundColor: "#000000d4" }}>
                <small className="text-uppercase" style={{ fontSize: "0.75rem" }}>{stat.label}</small>
                <strong className="">{stat.value}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximas partidas */}
      <div className="mb-4 text-center mt-5">
        <h5 className="fw-lighter mb-3 text-uppercase text-black">
          <i className="ri-calendar-event-line me-2"></i>Próximas Partidas
        </h5>
        <div className="row g-3">
          {matches.map((match, idx) => (
            <div className="col-12" key={idx}>
              <div className="p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-center" style={{ borderLeft: "4px solid #000000", backgroundColor: "#000000d4" }}>
                <small className="text-uppercase">{match.title}</small>
                <strong className="">{match.team}</strong>
              </div>
            </div>
          ))}
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
          <a href="https://youtube.com/c/furia" className="text-black">
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
