import { useState, useEffect } from "react";

const EditarForm = ({
  nombreProducto,
  stockProducto,
  precioProducto,
  imagenProducto,
  descProducto,
}) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [codigo, setCodigo] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(false);
  const [modalControl, setModalControl] = useState(false);
  const [agregado, setAgregado] = useState(false);

  /* setNombre(nombreProducto);
  setPrecio(precioProducto);
  setStock(stockProducto);
  setDesc(descProducto);
  setUrl(imagenProducto); */

  return (
    <div>
      <label
        htmlFor="my-modal-5"
        className="btn btn-warning w-full my-auto col-span-2 modal-button"
        onChange={() => {}}
      >
        editar
      </label>

      <input
        type="checkbox"
        id="my-modal-5"
        className="modal-toggle"
        onChange={() => {
          console.log(nombreProducto);
          console.log(precioProducto);
          console.log(stockProducto);
          console.log(descProducto);
          console.log(imagenProducto);
          setModalControl(!modalControl);
        }}
        checked={modalControl}
      />
      <label htmlFor="my-modal-5" className="modal cursor-pointer">
        <div className="toast toast-end z-50">
          {error && (
            <div className="alert alert-warning">
              <div>
                <span>Ha ocurrido un error.</span>
              </div>
            </div>
          )}
          {agregado && (
            <div className="alert alert-success">
              <div>
                <span>Producto agregado correctamente.</span>
              </div>
            </div>
          )}
        </div>
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="my-modal-5"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center">Editar producto</h3>
          <form
            className="grid grid-cols-2 gap-4 place-content-center m-2"
            action=""
          >
            <div className="form-control col-span-2">
              <label className="input-group input-group-vertical ">
                <span>Nombre</span>
                <input
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  value={nombre}
                  type="text"
                  placeholder="Rutini malbec"
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group input-group-vertical">
                <span>Stock</span>
                <input
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                  value={stock}
                  type="number"
                  placeholder="12"
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group input-group-vertical">
                <span>Precio</span>
                <input
                  onChange={(e) => {
                    setPrecio(e.target.value);
                  }}
                  value={precio}
                  type="number"
                  placeholder="$12000"
                  className="input input-bordered"
                />
              </label>
            </div>

            <div className="form-control col-span-2 ">
              <label className="input-group input-group-vertical">
                <span>Descripcion</span>
                <input
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  value={desc}
                  type="text"
                  placeholder="Vino malbec de univarietal..."
                  className="input input-bordered "
                />
              </label>
            </div>
            <div className="form-control col-span-2 ">
              <label className="input-group input-group-vertical">
                <span>Url Imagen</span>
                <input
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  value={url ? url : ""}
                  type="text"
                  placeholder="www.unaimagen.com"
                  className="input input-bordered "
                />
              </label>
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="btn col-span-2 w-10/12 m-auto"
              disabled={enviando}
            >
              {enviando ? "Enviando..." : "Agregar"}
            </button>
          </form>
        </label>
      </label>
    </div>
  );
};

export default EditarForm;
