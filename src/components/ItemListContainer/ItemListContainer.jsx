import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';





function ItemListContainer() {
    const [misProductos, setMisProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { categoria } = useParams();





    
    useEffect(() => {
        const cargarProductos = async () => {
            setLoading(true);
            setError(false);

            try {
                const productosRef = collection(db, 'productos');
                let q = productosRef;

                if (categoria) {
                    q = query(productosRef, where("categoria", "==", categoria));
                }

                const querySnapshot = await getDocs(q);
                const productos = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (productos.length === 0) {
                    setError(true);
                }

                setMisProductos(productos);
            } catch (err) {
                console.error('Error al cargar productos:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, [categoria]);

    if (error) {
        return <p>404: No se encontraron productos.</p>;
    }

    return (
        <section className="container-cards">
            {loading ? <Loader /> : (
                misProductos.map(prod => (
                    <Item key={prod.id} id={prod.id} nombre={prod.nombre} precio={prod.precio} img={prod.img} categoria={prod.categoria} />
                ))
            )}
        </section>
    );
}

export default ItemListContainer;
