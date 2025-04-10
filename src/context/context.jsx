import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [contador, setContador] = useState(1);

    const agregarAlCarrito = (producto) => {
        const productoEnCarrito = carrito.find(el => el.id === producto.id);

        if (productoEnCarrito) {
            const totalDeseado = productoEnCarrito.cantidad + producto.cantidad;

            if (totalDeseado > producto.stock) {
                alert("❗ No podés agregar más unidades que las disponibles en stock.");
                return;
            }

            const newCarrito = carrito.map(el =>
                el.id === producto.id
                    ? { ...el, cantidad: totalDeseado }
                    : el
            );
            setCarrito(newCarrito);
        } else {
            if (producto.cantidad > producto.stock) {
                alert("❗ No hay suficiente stock disponible.");
                return;
            }

            setCarrito([...carrito, producto]);
        }

        setContador(1);
    };

    const eliminarProducto = (id) => {
        setCarrito(carrito.filter(el => el.id !== id));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    return (
        <AppContext.Provider value={{
            carrito,
            agregarAlCarrito,
            contador,
            setContador,
            eliminarProducto,
            limpiarCarrito
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
