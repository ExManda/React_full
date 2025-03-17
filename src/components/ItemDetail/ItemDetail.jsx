import { Link, useParams } from 'react-router-dom';
import './ItemDetail.css';
import { useEffect, useState } from 'react';
import { fetchData } from '../../fetchData';
import Loader from '../Loader/Loader';
import Error404 from '../Error404/Error404';

function ItemDetail() {
    const { id } = useParams();
    const [detalle, setDetalle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetchData()
            .then(response => {
                const detalleDelProducto = response.find(el => el.id === parseInt(id));
                if (detalleDelProducto) {
                    setDetalle(detalleDelProducto);
                    setError(false);
                } else {
                    setError(true);
                }
            })
            .catch(err => {
                console.error("Error al cargar el producto:", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <Error404 />;







    const incrementarCantidad = () => {
        if (cantidad < detalle.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const reducirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };





    const agregarAlCarrito = () => {
        if (detalle.stock > 0) {
            console.log(`Agregaste ${cantidad} unidades de: ${detalle.nombre}`);
        }
    };

    return (
        <div className="card-detail">
            <h2>{detalle.nombre || "NO DISPONIBLE"}</h2>
            <h3>Precio: ${detalle.precio || "SIN PRECIO"}</h3>
            <p>Descripción: {detalle.descripcion}</p>

            {detalle.stock > 0 ? <p>Quedan {detalle.stock} unidades</p> : <p>Producto agotado!</p>}

            {detalle.oferta && <p><b>PRODUCTO EN OFERTA</b></p>}


            <div className="cantidad-control">
                <button onClick={reducirCantidad} disabled={cantidad <= 1}>-</button>
                <span>{cantidad}</span>
                <button onClick={incrementarCantidad} disabled={cantidad >= detalle.stock}>+</button>
            </div>


            <button disabled={detalle.stock === 0} className="card-detail-btn" onClick={agregarAlCarrito}>
                Agregar {cantidad} al carrito
            </button>

            <Link to="/">
                <button className="card-detail-btn">Volver al inicio</button>
            </Link>
        </div>
    );
}

export default ItemDetail;
