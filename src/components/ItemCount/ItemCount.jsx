import { useState } from 'react';
import './ItemCount.css';

function ItemCount() {


    const [numero, setNumero] = useState(5);


    return (
        <div className="contador-container">
            <h1>Contador</h1>
            <div className="buttons-container">
                <button className="btn-modify" onClick={() => setNumero(numero - 1)}>-</button>
                <p id="numero">{numero}</p>
                <button className="btn-modify" onClick={() => setNumero(numero + 1)}>+</button>
            </div>
        </div>
    );
};

export default ItemCount;