var express = require("express");
var { writeFile, readFile } = require("fs/promises");
var router = express.Router();

class ContenedorProductos {
  constructor() {
    readFile("productos.json").then(
      (data) => (this.productos = JSON.parse(data))
    );
  }

  traerProducto(id) {
    let target = this.productos.filter(
      (producto) => producto.id === parseInt(id)
    )[0];
    if (target === undefined) {
      return false;
    } else {
      return target;
    }
  }
  traerTodos() {
    return this.productos;
  }

  agregarProducto(producto) {
    this.productos.push({
      id: producto.id || this.productos.length + 1,
      timestamp: Date.now(),
      nombre: producto.nombre,
      desc: producto.desc,
      codigo: producto.codigo,
      foto: producto.foto,
      precio: producto.precio,
      stock: producto.stock,
    });

    return this.productos;
  }

  editarProducto(id, producto) {
    let target = this.traerProducto(id);

    (target.nombre = producto.nombre),
      (target.desc = producto.desc),
      (target.codigo = producto.codigo),
      (target.foto = producto.foto),
      (target.precio = producto.precio),
      (target.stock = producto.stock);
    return target;
  }

  borrarProducto(id) {
    let index = this.productos.map((x) => x.id).indexOf(parseInt(id));

    if (index === -1) {
      return false;
    } else {
      let borrado = this.productos.splice(index, 1);
      return borrado[0];
    }
  }
}

let productosApi = new ContenedorProductos();

//Middleware que lee los datos de la DB (archivo local en JSON) y los carga en la instancia de la clase para una manipulacion mas simple.
router.use(function timeLog(req, res, next) {
  readFile("productos.json").then(
    (data) => (productosApi = new ContenedorProductos(JSON.parse(data)))
  );

  next();
});

// Devuelve todos los productos si no hay parametro de id , o el producto con el id solicitado si lo hay.
router.get("/:id?", function (req, res) {
  if (req.params.id) {
    if (productosApi.traerProducto(req.params.id) === false) {
      res.send("No se ha encontrado ningun producto con ese id");
    } else {
      res.send(productosApi.traerProducto(req.params.id));
    }
  } else {
    res.send(productosApi.traerTodos());
  }
});

router.post("/", (req, res) => {
  writeFile(
    "./productos.json",
    JSON.stringify(productosApi.agregarProducto(req.body), null, 2)
  ).then(() => console.log(`Producto agregado`));

  res.send(productosApi.traerTodos());
});

router.put("/:id", (req, res) => {
  const editado = productosApi.editarProducto(req.params.id, req.body);
  writeFile(
    "./productos.json",
    JSON.stringify(productosApi.traerTodos(), null, 2)
  ).then(() => console.log(`Producto editado`));

  res.send(editado);
});

router.delete("/:id", (req, res) => {
  let borrado = productosApi.borrarProducto(req.params.id);
  console.log(borrado);
  writeFile(
    "./productos.json",
    JSON.stringify(productosApi.traerTodos(), null, 2)
  ).then(() => console.log(`Producto borrado`));

  res.send(`El producto ${JSON.stringify(borrado)} ha sido eliminado.`);
});

// define the about route
router.get("/about", function (req, res) {
  res.send("About Productos");
});

module.exports = router;
