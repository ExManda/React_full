import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';
import logo from '../../assets/Logo/Logo-Ozaru-h.png';



function Navbar() {


    return (
        <header>
            <nav className="nav-bar">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Logo Ozaru" className="Logo" />
                </Link>

                <ul className="nav-bar-options">
                    <li className="nav-bar-item">
                        <Link to="/">
                            Productos
                        </Link>
                    </li>
                    <li className="nav-bar-item">
                        <Link to="/categoria/proteinas">
                            Proteinas
                        </Link>
                    </li>
                    <li className="nav-bar-item">
                        <Link to="/categoria/creatinas">
                            Creatinas
                        </Link>
                    </li>
                </ul>
                <CartWidget />
            </nav>
        </header>
    );

};

export default Navbar;
