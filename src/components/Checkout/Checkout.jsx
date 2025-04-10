import { useState } from 'react';
import { useAppContext } from "../../context/context";
import { addDoc, collection, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate, Link } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const { carrito, limpiarCarrito } = useAppContext();

    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        telefono: "",
    });

    const [ordenId, setOrdenId] = useState(null);

    const modificarInput = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const crearOrden = async (e) => {
        e.preventDefault();

        console.log("🧪 Carrito al momento de crear la orden:", carrito);

        const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

        const orden = {
            comprador: formData,
            items: carrito.map(prod => ({
                id: prod.id,
                nombre: prod.nombre,
                precio: prod.precio,
                cantidad: prod.cantidad,
                categoria: prod.categoria
            })),
            total,
            fecha: serverTimestamp()
        };

        try {

            const ordenesRef = collection(db, "ordenes");
            const docRef = await addDoc(ordenesRef, orden);
            setOrdenId(docRef.id);


            for (const prod of carrito) {
                const prodRef = doc(db, "productos", prod.id);
                await updateDoc(prodRef, {
                    stock: increment(-prod.cantidad)
                });
            }

            limpiarCarrito();

        } catch (error) {
            console.error("Error al crear la orden:", error);
        }

        setFormData({
            nombre: "",
            correo: "",
            telefono: "",
        });
    };

    if (carrito.length === 0 && !ordenId) {
        return (
            <div className="checkout-empty">
                <h2>Tu carrito está vacío</h2>
                <Link to="/"><button>Volver al catálogo</button></Link>
            </div>
        );
    }

    if (ordenId) {
        return (
            <div className="checkout-success">
                <h2>¡Gracias por tu compra!</h2>
                <p>Tu ID de orden es: <strong>{ordenId}</strong></p>
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        );
    }

    return (
        <div className="checkout-form">
            <h2>Finalizar Compra</h2>
            <form onSubmit={crearOrden}>
                <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={modificarInput}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo"
                    name="correo"
                    value={formData.correo}
                    onChange={modificarInput}
                    required
                />
                <input
                    type="tel"
                    placeholder="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={modificarInput}
                    required
                />
                <input type="submit" value="Confirmar Orden" />
            </form>

            <div className="checkout-resumen">
                <h3>Resumen de tu carrito:</h3>
                <ul>
                    {carrito.map(prod => (
                        <li key={prod.id}>
                            {prod.nombre} x {prod.cantidad} - ${prod.precio * prod.cantidad}
                        </li>
                    ))}
                </ul>
                <p><strong>Total: ${carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)}</strong></p>
            </div>
        </div>
    );
}

export default Checkout;
