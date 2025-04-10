import { Link, useParams } from 'react-router-dom';
import './ItemDetail.css';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Loader from '../Loader/Loader';
import Error404 from '../Error404/Error404';
import { useAppContext } from '../../context/context';
import Contador from '../Contador/Contador';

function ItemDetail() {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { agregarAlCarrito, contador } = useAppContext();

  useEffect(() => {
    const obtenerDetalle = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDetalle({
            id: docSnap.id,
            ...docSnap.data()
          });
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    obtenerDetalle();
  }, [id]);

  if (loading) return <Loader />;
  if (error || !detalle) return <Error404 />;

  const imgURL = detalle.img || "https://via.placeholder.com/400x300?text=Sin+Imagen";

  const handleAgregar = () => {
    if (contador > detalle.stock) {
      alert(" No hay suficiente stock disponible.");
      return;
    }

    agregarAlCarrito({
      id: detalle.id,
      nombre: detalle.nombre,
      precio: Number(detalle.precio),
      cantidad: contador,
      img: detalle.img,
      categoria: detalle.categoria,
      stock: detalle.stock 
    });
  };

  return (
    <div className="card-detail">
      <img src={imgURL} alt={detalle.nombre} className="card-detail-img" />
      <h2>{detalle.nombre}</h2>
      <h3>Precio: ${detalle.precio}</h3>
      <p>{detalle.descripcion}</p>

      {detalle.oferta && <p className="oferta"> Producto en oferta</p>}

      {detalle.stock > 0 ? (
        <>
          <p>Stock disponible: {detalle.stock}</p>
          <Contador stock={detalle.stock} />

          <div className="card-detail-btn-group">
            <button
              className="card-detail-btn"
              disabled={contador > detalle.stock}
              onClick={handleAgregar}
            >
              Agregar {contador} al carrito
            </button>

            <Link to="/">
              <button className="card-detail-btn">Volver al inicio</button>
            </Link>
          </div>
        </>
      ) : (
        <p className="agotado">Producto agotado</p>
      )}
    </div>
  );
}

export default ItemDetail;
