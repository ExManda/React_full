import { Link } from 'react-router-dom';
import './Item.css';




function Item({ id, nombre, precio }) { //destructuring - props


    function agregarAlCarrito() {
        console.log("Vas a agregar:", nombre);
    };


    return (


        <div className="card">
            <h2> {nombre || "No Disponible"}</h2>
            <h3> Precio: ${precio || "Sin Precio"} </h3>
           
            <Link to={`/detalle/${id}`}>
                <button disabled={!nombre} className="card-btn">
                    Comprar
                </button>
            </Link>

        </div>

    );
};

export default Item;
