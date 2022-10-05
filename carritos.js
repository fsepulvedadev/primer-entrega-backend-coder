const express = require("express");
const router = express.Router();
const { writeFile, readFile } = require("fs/promises");

class ContenedorProductos {
  constructor() {
    readFile("carritos.json").then(
      (data) => (this.carritos = JSON.parse(data))
    );
  }

  traerCarrito(id) {
    let target = this.carritos.filter((item) => item.id === parseInt(id))[0];
    if (target === undefined) {
      return false;
    } else {
      return target;
    }
  }
  traerTodos() {
    return this.carritos;
  }

  agregarCarrito(carrito) {
    let nuevoCarrito = {
      id: carrito.id || this.carritos.length + 1,
      timestampCarrito: Date.now(),
      productos: carrito.productos,
    };

    this.carritos.push(nuevoCarrito);

    return nuevoCarrito;
  }

  agregarProductoCarrito(idCarrito, DataNuevoProducto) {
    let target = this.carritos.filter(
      (item) => item.id === parseInt(idCarrito)
    )[0];
    let nuevoProducto = {
      id: target.productos.length + 1,
      timestamp: Date.now(),
      nombre: DataNuevoProducto.nombre,
      desc: DataNuevoProducto.desc,
      codigo: DataNuevoProducto.codigo,
      foto: DataNuevoProducto.foto,
      precio: DataNuevoProducto.precio,
      stock: DataNuevoProducto.stock,
    };
    target.productos.push(nuevoProducto);
  }

  borrarCarrito(id) {
    let index = this.carritos.map((x) => x.id).indexOf(parseInt(id));

    if (index === -1) {
      return false;
    } else {
      let borrado = this.carritos.splice(index, 1);
      return borrado[0];
    }
  }

  borrarProductoDeCarrito(idCarrito, idProducto) {
    let index = this.carritos.map((x) => x.id).indexOf(parseInt(idCarrito));

    if (index === -1) {
      return false;
    } else {
      let target = this.carritos[index];
      let indexProducto = target.productos
        .map((x) => x.id)
        .indexOf(parseInt(idProducto));
      if (indexProducto === -1) {
        return false;
      } else {
        let borrado = target.productos.splice(indexProducto, 1);
        return borrado[0];
      }
    }
  }
}

let carritosApi = new ContenedorProductos();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  readFile("carritos.json").then(
    (data) => (carritosApi = new ContenedorProductos(JSON.parse(data)))
  );

  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send(carritosApi.traerTodos());
});
router.get("/:id/productos", (req, res) => {
  let target = carritosApi.traerCarrito(req.params.id);

  if (!target) {
    res.send("No se ha encontrado ningun carrito con ese id");
  } else {
    res.send(target.productos);
  }
});

router.post("/", (req, res) => {
  const nuevo = carritosApi.agregarCarrito(req.body);
  writeFile(
    "./carritos.json",
    JSON.stringify(carritosApi.traerTodos(), null, 2)
  ).then(() => console.log(`Carrito agregado`));

  res.send(`Se ha agregado un carrito con el id: ${nuevo.id}`);
});

router.post("/:id/productos", (req, res) => {
  let target = carritosApi.traerCarrito(req.params.id);
  if (!target) {
    res.send("No se ha encontrado ningun carrito con ese id");
  } else {
    carritosApi.agregarProductoCarrito(req.params.id, req.body);
    writeFile(
      "./carritos.json",
      JSON.stringify(carritosApi.traerTodos(), null, 2)
    ).then(() => console.log(`Producto agregado a carrito`));
    res.send(carritosApi.traerTodos());
  }
});
router.delete("/:id/productos/:id_prod", (req, res) => {
  let target = carritosApi.traerCarrito(req.params.id);
  if (!target) {
    res.send("No se ha encontrado ningun carrito con ese id");
  } else {
    let borrado = carritosApi.borrarProductoDeCarrito(
      req.params.id,
      req.params.id_prod
    );
    if (!borrado) {
      res.send("No se ha encontrado un producto con ese ID");
    } else {
      writeFile(
        "./carritos.json",
        JSON.stringify(carritosApi.traerTodos(), null, 2)
      ).then(() => console.log(`Producto eliminado ${borrado} del carrito`));
      res.send(carritosApi.traerTodos());
    }
  }
});

router.delete("/:id", (req, res) => {
  let target = carritosApi.traerCarrito(req.params.id);
  if (!target) {
    res.send("No se ha encontrado ningun carrito con ese id");
  } else {
    let eliminado = JSON.stringify(
      carritosApi.borrarCarrito(req.params.id),
      null,
      2
    );
    writeFile(
      "./carritos.json",
      JSON.stringify(carritosApi.traerTodos(), null, 2)
    );
    res.send(`Se ha borrado el carrito ${eliminado}`);
  }
});

// define the about route
router.get("/about", function (req, res) {
  res.send("About carrito");
});

module.exports = router;
