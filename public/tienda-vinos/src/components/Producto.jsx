import React from "react";
import { useState } from "react";
import EditarForm from "./EditarForm";

const Producto = ({
  nombre,
  desc,
  stock,
  precio,
  imagen,
  setNuevoProducto,
  id,
}) => {
  const [borrado, setBorrado] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault(e);
    setNuevoProducto(true);

    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:8080/api/productos/${id}`, request)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setBorrado(true);
        setTimeout(() => {
          setBorrado(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <>
      <div className="toast toast-end z-50">
        {borrado && (
          <div className="alert alert-success">
            <div>
              <span>Producto se ha eliminado correctamente.</span>
            </div>
          </div>
        )}
      </div>
      <div className="card w-72 mt-4 md:w-96 bg-base-300 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={`${imagen ? imagen : "https://placeimg.com/400/225/nature"}`}
            alt={desc}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{nombre}</h2>
          <p>{desc}</p>
          <p>$ {precio}</p>
          <div className="card-actions grid grid-cols-2 grid-rows-2 place-content-center">
            <button className="btn btn-success col-span-2">Comprar</button>
            <button
              className="btn bg-red-600 border-red-600 w-full"
              onClick={(e) => handleDelete(e)}
            >
              Borrar
            </button>
            <EditarForm
              nombreProducto={nombre}
              descProducto={desc}
              stockProducto={stock}
              imagenProducto={imagen}
              precioProducto={precio}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Producto;
