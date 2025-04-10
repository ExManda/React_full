import { Link } from 'react-router-dom';
import './Item.css';
import { useAppContext } from '../../context/context';

function Item({ id, nombre, precio, img, categoria }) {
    const { agregarAlCarrito } = useAppContext();
    const imgURL = img || "https://via.placeholder.com/200x150?text=Sin+Imagen";

    return (
        <div className="card">
            <img src={imgURL} alt={nombre} className="card-item-img" />
            <h2>{nombre || "NO DISPONIBLE"}</h2>
            <h3>Precio: ${precio || "SIN PRECIO"}</h3>

            <Link to={`/detalle/${id}`}>
                <button className="card-btn">Ver detalle</button>
            </Link>

            <button 
                className="card-btn" 
                disabled={!nombre} 
                onClick={() => agregarAlCarrito({
                    id,
                    nombre,
                    precio: Number(precio),
                    cantidad: 1,
                    img,
                    categoria
                })}
            >
                Agregar al carrito
            </button>
        </div>
    );
}

export default Item;
