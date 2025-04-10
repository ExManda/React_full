import './Cart.css';
import React from "react";
import { Link } from 'react-router-dom';
import { useAppContext } from "../../context/context";

function Cart() {
    const { carrito, eliminarProducto, limpiarCarrito } = useAppContext();

    return (
        <div className="cart-container">
            {carrito.length > 0 ? (
                <>
                    {carrito.map(el => (
                        <div key={el.id} className="cart-item">
                            <img src={el.img} alt={el.nombre} className="cart-item-img" />
                            <p>{el.nombre}</p>
                            <p>${el.precio}</p>
                            <p>Cantidad: {el.cantidad}</p>
                            <p>Subtotal: ${el.cantidad * el.precio}</p>
                            <button onClick={() => eliminarProducto(el.id)}>Eliminar del carrito</button>
                        </div>
                    ))}

                    <p className="cart-total">
                        Total: ${carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)}
                    </p>

                    <div className="cart-actions">
                        <button onClick={limpiarCarrito}>Limpiar carrito</button>
                        <Link to="/checkout">
                            <button>Finalizar compra</button>
                        </Link>
                    </div>
                </>
            ) : (
                <p className="empty-cart">Carrito vacío</p>
            )}
        </div>
    );
};

export default Cart;
