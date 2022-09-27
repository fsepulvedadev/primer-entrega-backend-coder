const express = require("express");
const cors = require("cors");
var router = express.Router();

const productos = require("./productos");
const carritos = require("./carritos");

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/carritos", carritos);
app.use("/api/productos", productos);
app.use("/api", router);

router.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en puerto ${PORT}`);
});
