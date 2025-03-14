import { useEffect, useState } from 'react';
import { fetchData } from '../../fetchData';
import Item from '../Item/Item';
import Loader from '../Loader/Loader';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemListContainer.css';
import { useParams } from 'react-router-dom';


function ItemListContainer() {

    const [todosLosProductos, setTodosLosProductos] = useState([]); // Lista completa de productos
    const [misProductos, setMisProductos] = useState([]); // Lista filtrada
    const [loading, setLoading] = useState(true); // Estado de carga
    const {categoria} = useParams();




    // Hook de efectos

    useEffect(() => {
        if (todosLosProductos.length === 0) {
            fetchData().then(response => {
                setTodosLosProductos(response);
            if(categoria) {
        const productosFiltrados = response.filter(el => el.categoria === categoria);
        setMisProductos(productosFiltrados);
        setLoading(false);
        } else{
            setMisProductos(response);
            setLoading(false);
        };
        })
            .catch(err => console.error(err));


} else {
            if (categoria) {
                const productosFiltrados = todosLosProductos.filter(el => el.categoria === categoria);
                setMisProductos(productosFiltrados);
            } else {
                setMisProductos(todosLosProductos);
            };
        }
    }, [categoria]);


    
    return (
        <>

            
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
