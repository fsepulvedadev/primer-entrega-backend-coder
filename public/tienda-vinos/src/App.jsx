import ListaProductos from "./components/ListaProductos";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="h-full w-full flex flex-col items-center justify-center">
        <ListaProductos />
      </div>
    </>
  );
}

export default App;
