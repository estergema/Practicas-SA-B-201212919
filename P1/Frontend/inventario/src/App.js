import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [criterioOrden, setCriterioOrden] = useState(null);
  const [nombreBusqueda, setNombreBusqueda] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const agregarProducto = () => {
    fetch("http://localhost:4000/producto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, cantidad: parseInt(cantidad), precio: parseFloat(precio) })
    }).then(() => {
      setNombre("");
      setCantidad("");
      setPrecio("");
      window.location.reload();
    });
  };

  const eliminarProducto = (nombre) => {
    fetch(`http://localhost:4000/producto/${nombre}`, { method: "DELETE" })
      .then(() => window.location.reload());
  };

  const buscarProducto = () => {
    if (nombreBusqueda.trim() === "") return;
    fetch(`http://localhost:4000/producto/${nombreBusqueda}`)
      .then((res) => res.json())
      .then((data) => setProductos(data ? [data] : []));
  };

  const ordenarProductos = () => {
    if (criterioOrden.trim() === "") return;
    fetch(`http://localhost:4000/productos/ordenar/${criterioOrden}`)
      .then((res) => res.json())
      .then((data) => {setProductos(data)});
  };

  const opcionesOrden = [
    { label: "Cantidad", value: "cantidad" },
    { label: "Precio", value: "precio" }
  ];

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestión de Inventario</h1>
      <div className="mb-4 flex gap-2">
        <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>      
        <InputText placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <InputText type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        <InputText type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        <Button label="Agregar" icon="pi pi-plus" className="p-button-success" onClick={agregarProducto} />
      </div>
      <br></br>
      <hr></hr>
      <h2 className="text-2xl font-bold mb-4">Productos</h2>              
      <div className="mb-4 flex gap-2">
        <InputText placeholder="Buscar por nombre" value={nombreBusqueda} onChange={(e) => setNombreBusqueda(e.target.value)} />
        <Button label="Buscar" icon="pi pi-search" className="p-button-info" onClick={buscarProducto} />
        <Dropdown value={criterioOrden} options={opcionesOrden} onChange={(e) => setCriterioOrden(e.value)} placeholder="Ordenar por" />
        <Button label="Ordenar" icon="pi pi-sort" className="p-button-warning" onClick={ordenarProductos} />
      </div>
      <br></br>
      <DataTable value={productos} paginator rows={5} className="p-datatable-striped">
        <Column field="nombre" header="Nombre" />
        <Column field="cantidad" header="Cantidad" />
        <Column field="precio" header="Precio" />
        <Column 
          header="Acciones" 
          body={(rowData) => (
            <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => eliminarProducto(rowData.nombre)} />
          )} 
        />
      </DataTable>
    </div>
  );
};

export default App;
