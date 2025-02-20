import './Item.css';


function Item({ nombre, precio }) { //destructuring - props


    function agregarAlCarrito() {
        console.log("Vas a agregar:", nombre);
    };


    return (


        <div className="card">
            <h2 className="card-name">{nombre || "No Disponible"}</h2>
            <h3 className="card-precio">precio: ${precio || "Sin Precio"} </h3>
            <button disabled={!nombre} className="card-btn" onClick={() => agregarAlCarrito()}>Agregar al carrito</button>
        </div>

    );
};

export default Item;
