import React from "react";
import AgregarForm from "./AgregarForm";

const Navbar = ({ setNuevoProducto }) => {
  return (
    <div className="h-24 bg-accent grid grid-cols-8 md:grid-cols-12 place-content-center">
      <div className="col-span-2 hidden md:block"></div>

      <h1 className="text-xl font-bold md:text-3xl text-primary-content my-10 col-span-5 md:col-span-8 w-full text-left ml-3 md:ml-0 md:text-center">
        Tienda de bebidas 🍹
      </h1>
      <div className="flex items-center w-full col-span-2">
        <AgregarForm setNuevoProducto={setNuevoProducto} />
      </div>
    </div>
  );
};

export default Navbar;
