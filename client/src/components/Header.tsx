import logo from '../assets/logo-furia.svg';
import { Link } from 'react-router-dom';
import { MobileSidebar } from './MobileSidebar';

const Header = () => {
  return (
    <>
      <header className="w-100 px-3 px-md-4 py-3 d-flex align-items-center justify-content-between position-sticky top-0 bg-white shadow-sm border" style={{ zIndex: 1050 }}>
        
        {/* botão menu mobile */}
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn d-md-none p-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            <i className="bi bi-list fs-4" />
          </button>

          {/* Logo */}
          <div className="d-flex flex-grow-1 justify-content-center justify-content-md-start align-items-center">
            <Link to="/">
              {/* Logo mobile */}
              <img src={logo} alt="furia-logo" className="d-block d-md-none" style={{ height: '25px' }} />

              {/* Logo desktop */}
              <img src={logo} alt="furia-logo" className="d-none d-md-block" style={{ height: '40px' }} />
            </Link>
          </div>
        </div>

        {/* Botões guias */}
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <Link to="/chat">
            <i className="bi bi-chat text-black fs-5"></i>
          </Link>
          <Link to="/auth">
            <i className="bi bi-box-arrow-in-right text-black fs-5"></i>
          </Link>
          <Link to="https://furia.gg" className="btn btn-sm btn-dark fw-lighter">
            LOJA FURIA
          </Link>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar />
    </>
  );
};

export default Header;

