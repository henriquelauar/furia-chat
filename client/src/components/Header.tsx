import logo from '../assets/logo-furia.svg'
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="w-100 px-3 px-md-4 py-3 d-flex align-items-center justify-content-between position-sticky top-0 bg-white shadow-sm border">
      {/* Logo */}
      <div className="d-flex flex-grow-1 justify-content-center justify-content-md-start align-items-center">
        <Link to="/">
          <img src={logo} alt="furia-logo" style={{ height: '40px' }} />
        </Link>
      </div>

      {/* Botões Acessórios */}
      <div className="d-none d-md-flex align-items-center gap-2 flex-wrap">
        <Link to="https://furia.gg" className="btn btn-sm btn-dark fw-lighter">
          LOJA FURIA
        </Link>
      </div>
    </header>
  );
};

export default Header;
