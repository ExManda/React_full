import './navbar.css';

function Navbar() {
    return (
        <header>
            <nav className="nav-bar">
                <p>logo</p>
                <ul className="nav-bar-options">
                    <li className="nav-bar-item">Home</li>
                    <li className="nav-bar-item">Productos</li>
                    <li className="nav-bar-item">Contacto</li>
                </ul>
                <p>Icono carrito (4)</p>
            </nav>
        </header>
    );

};

export default Navbar;
