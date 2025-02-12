import Item from '../Item/Item';
import './ItemListContainer.css';

function ItemListContainer() {
    return (

        <section className="container-cards">
            <Item nombre={"Producto1"} precio={100} />
            <Item nombre={"Producto2"} precio={150} />
            <Item nombre={"Producto3"} precio={75} />

        </section>
    );
};

export default ItemListContainer;
