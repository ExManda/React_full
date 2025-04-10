import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.css'; 





function Error404() {
    return (
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <p className="error-message">Producto no encontrado, lo sentimos.</p>

            <Link to="/">
                <button className="error-button" aria-label="Volver al inicio">Volver al inicio</button>
            </Link>
        </div>
    );
}

export default Error404;
