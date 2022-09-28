import { useEffect, useState } from "react";
import Producto from "./Producto";

const ListaProductos = ({ productos, setNuevoProducto }) => {
  return (
    <div className="h-full grid md:grid-cols-2 grid-cols-1 gap-5 place-content-center my-4">
      {productos.map((item, key) => {
        return (
          <Producto
            key={key}
            nombre={item.nombre}
            desc={item.desc}
            imagen={item.foto}
            stock={item.stock}
            precio={item.precio}
            id={item.id}
            setNuevoProducto={setNuevoProducto}
          />
        );
      })}
    </div>
  );
};

export default ListaProductos;
