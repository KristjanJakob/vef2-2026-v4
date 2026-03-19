import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          Fréttavefur
        </Link>

        <nav>
          <ul className="nav">
            <li>
              <Link to="/">Forsíða</Link>
            </li>
            <li>
              <Link to="/create">Búa til frétt</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;