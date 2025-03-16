import { useEffect, useState } from 'react';
import { fetchData } from '../../fetchData';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';






function ItemListContainer() {
    const [todosLosProductos, setTodosLosProductos] = useState([]);
    const [misProductos, setMisProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { categoria } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(false);

        fetchData()
            .then(response => {
                setTodosLosProductos(response);


                const productosFiltrados = categoria
                    ? response.filter(el =>
                        el.categoria.toLowerCase() === categoria.toLowerCase()
                    )
                    : response;


                if (productosFiltrados.length === 0) {
                    setError(true);
                }

                setMisProductos(productosFiltrados);
            })
            .catch(err => {
                console.error('Error al cargar productos:', err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [categoria]);





    if (error) {
        return <p>404: Se produjo un error.</p>;
    }

    return (
        <>
            <section className="container-cards">
                {
                    loading ? <Loader /> : (
                        misProductos.map(el => {
                            return (
                                <Item key={el.id} id={el.id} nombre={el.nombre} precio={el.precio} />
                            );
                        })
                    )
                }
            </section>
        </>
    );
}

export default ItemListContainer;
