import ListaProductos from "./components/ListaProductos";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState(true);

  useEffect(() => {
    if (nuevoProducto) {
      fetch("http://localhost:8080/api/productos")
        .then((res) => res.json())
        .then((data) => setProductos(data))
        .then(() => {
          console.log(productos);
        })
        .catch((error) => console.log(error));
      setNuevoProducto(false);
    }
  }, [nuevoProducto]);
  return (
    <>
      <Navbar setNuevoProducto={setNuevoProducto} />
      <div className="h-full w-full flex flex-col items-center justify-center">
        <ListaProductos
          setNuevoProducto={setNuevoProducto}
          productos={productos}
        />
      </div>
    </>
  );
}

export default App;
