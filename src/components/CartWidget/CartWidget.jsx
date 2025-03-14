import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import './CartWidget.css';

const CartWidget = () => {
    return (
        <div className="cart-widget">
            <FaCartShopping className="cart-icon" />
            <span className="cart-count">2</span>
        </div>
    );
};

export default CartWidget;