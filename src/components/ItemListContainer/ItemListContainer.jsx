import Item from '../Item/Item';
import './ItemListContainer.css';

function ItemListContainer() {
    return (

        <section className="container-cards">
            <Item nombre={"PRODUCTO 1"} precio={100} />
            <Item nombre={"PRODUCTO 2"} precio={135} />
            <Item nombre={"PRODUCTO 3"} precio={75} />

        </section>
    );
};

export default ItemListContainer;
