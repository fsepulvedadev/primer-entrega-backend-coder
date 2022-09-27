import React from "react";

const Producto = ({ nombre, desc, stock, precio, imagen }) => {
  return (
    <div className="card w-72 mt-4 md:w-96 bg-base-300 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={`${imagen ? imagen : "https://placeimg.com/400/225/arch"}`}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{nombre}</h2>
        <p>{desc}</p>
        <p>$ {precio}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Producto;
