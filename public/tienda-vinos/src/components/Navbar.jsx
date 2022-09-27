import React from "react";

const Navbar = () => {
  return (
    <div className="h-24 bg-accent grid grid-cols-8 md:grid-cols-12 place-content-center">
      <div className="col-span-2"></div>

      <h1 className="text-xl md:text-3xl text-primary-content my-10 col-span-4 md:col-span-8 w-full text-center">
        Tienda de vinos
      </h1>
      <button className="btn btn-secondary w-auto md:w-8/12 my-auto mr-2  col-span-2">
        Agregar Item
      </button>
    </div>
  );
};

export default Navbar;
