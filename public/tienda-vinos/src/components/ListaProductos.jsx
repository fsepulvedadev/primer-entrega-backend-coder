import { useEffect, useState } from "react";
import Producto from "./Producto";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .then(() => {
        console.log(productos);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="h-full grid md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
      {productos.map((item, key) => {
        return (
          <Producto
            key={key}
            nombre={item.nombre}
            desc={item.desc}
            imagen={item.imagen}
            stock={item.stock}
            precio={item.precio}
          />
        );
      })}
    </div>
  );
};

export default ListaProductos;
