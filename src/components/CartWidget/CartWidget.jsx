import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import './CartWidget.css';
import { useAppContext } from "../../context/context";
import { Link } from 'react-router-dom';



function CartWidget() {
    const { carrito } = useAppContext();
    const totalItems = carrito.reduce((acc, el) => acc + el.cantidad, 0);



    return (
        <Link to="/cart" className="cart-link">
        <div className="cart-widget">
            <FaCartShopping className="cart-icon" />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
    </Link>
    );
};

export default CartWidget;