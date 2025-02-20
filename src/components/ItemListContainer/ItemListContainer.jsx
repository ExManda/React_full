import { useEffect, useState } from 'react';
import { fetchData } from '../../fetchData';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import './ItemListContainer.css';


function ItemListContainer({ greetings }) {

    const [todosLosProductos, setTodosLosProductos] = useState([]); // Lista completa de productos
    const [misProductos, setMisProductos] = useState([]); // Lista filtrada
    const [loading, setLoading] = useState(true); // Estado de carga



    const usarFiltro = (filtro) => {
        switch (filtro) {
            case "Ninguno":
                setMisProductos([]);
                break;
            case "Todos":
                setMisProductos(todosLosProductos);
                break;
            case "Baratos":
                setMisProductos(todosLosProductos.filter(el => el.precio < 100).sort((a, b) => a.precio - b.precio));
                break;
            case "Caros":
                setMisProductos(todosLosProductos.filter(el => el.precio >= 100).sort((a, b) => a.precio - b.precio));
                break;
            default:
                break;
        };
    };



    // Hook de efectos

    useEffect(() => {
        fetchData().then(response => {
            setTodosLosProductos(response);
            setMisProductos(response);
            setLoading(false);
        })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h1>{greetings}</h1>
            <hr />
            <div className="container-filter">
                <button onClick={() => usarFiltro("Todos")}>Todos</button>
                <button onClick={() => usarFiltro("Baratos")}>Baratos</button>
                <button onClick={() => usarFiltro("Caros")}>Caros</button>
                <button onClick={() => usarFiltro("Ninguno")}>Ninguno</button>
            </div>
            <section className="container-cards">
                {
                    loading ? <Loader /> :
                        misProductos.map(el => {
                            return (
                                <Item key={el.id} nombre={el.nombre} precio={el.precio} />
                            );
                        })
                }


                {/*<Item nombre={"PRODUCTO 1"} precio={100} />
            <Item nombre={"PRODUCTO 2"} precio={135} />
            <Item nombre={"PRODUCTO 3"} precio={75} />
            */}

            </section>
        </>
    );
};



export default ItemListContainer;
