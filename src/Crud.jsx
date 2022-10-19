import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";

const Crud = () => {
  const [apellidos, setApellidos] = useState("");
  const [nombre, setNombre] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);

  const tipos = [
    { value: "CC", name: "Cédula de ciudadanía" },
    { value: "TI", name: "Tarjeta de identidad" },
    { value: "CE", name: "Cédula de extranjería" },
  ];

  const _tipoIdentificacion = (identificacion) => {
    let text = "";
    // console.log(identificacion);
    tipos.forEach((e) => {
      if (identificacion === e.value) text = e.name;
    });
    return text;
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("clients").get();
        const array = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setItems(array);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  });

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("clients").doc(id).delete();
      const aux = items.filter((item) => item.id !== id);
      setItems(aux);
    } catch (error) {
      console.log(error);
    }
  };

  const activarEditar = (item) => {
    setNombre(item.nombre);
    setCiudad(item.ciudad);
    setDepartamento(item.departamento);
    setCiudad(item.ciudad);
    setDireccion(item.direccion);
    setApellidos(item.apellidos);
    setTipoIdentificacion(item.tipo_identificacion);
    setIdentificacion(item.identificacion);
    setId(item.id);
  };

  const limpiar = (e) => {
    if (e) {
      e.preventDefault();
    }
    setNombre("");
    setCiudad("");
    setDepartamento("");
    setCiudad("");
    setDireccion("");
    setApellidos("");
    setIdentificacion("");
    setId(null);
    setError("");
  };

  const guardarDatos = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("Campo nombre vacío");
      return;
    }

    if (!apellidos.trim()) {
      setError("Campo apellidos vacío");
      return;
    }

    if (!departamento.trim()) {
      setError("Campo departamento vacío");
      return;
    }
    if (!ciudad.trim()) {
      setError("Campo ciudad vacío");
      return;
    }
    if (!direccion.trim()) {
      setError("Campo dirección vacío");
      return;
    }
    if (!identificacion.trim()) {
      setError("Campo identificación vacío");
      return;
    }
    if (!tipoIdentificacion.trim()) {
      console.log(tipoIdentificacion);
      setError("Campo tipo identificación vacío");
      return;
    }

    try {
      const db = firebase.firestore();
      const cliente = {
        nombre,
        apellidos,
        departamento,
        ciudad,
        tipo_identificacion: tipoIdentificacion,
        identificacion,
        direccion,
      };
      if (id) {
        await db.collection("clients").doc(id).update(cliente);
      } else {
        await db.collection("clients").add(cliente);
      }
      limpiar();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container container-fluid">
      <h3>Formulario clientes</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="form-group">
                  <label>Nombres</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <label>Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                  />
                  <label>Departamento</label>
                  <input
                    type="text"
                    className="form-control"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                  />
                  <label>Ciudad</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                  <label>Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                  <label>Identificación</label>
                  <input
                    type="text"
                    className="form-control"
                    value={identificacion}
                    onChange={(e) => setIdentificacion(e.target.value)}
                  />
                  <label>Tipo de identificación</label>
                  <select
                    className="form-control"
                    value={tipoIdentificacion}
                    onChange={(e) => setTipoIdentificacion(e.target.selectedOptions[0].value)}
                  >
                    {tipos.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <input
                  type="submit"
                  className="btn btn-primary"
                  onClick={guardarDatos}
                  value={id ? "Editar persona" : "Crear persona"}
                />
                <button className="btn btn-success" onClick={limpiar}>
                  {id ? "Cancelar" : "Limpiar"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8 mt-5 ">
          <ul className="list-group">
            <div className="row">
            {items.map((e) => (
                <div className="col" key={e.id}>
                <div className="card cardw" >
                  <img src="https://picsum.photos/500" className="card-img-top" alt="" />
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <strong>Nombre:</strong> {e.nombre}
                      </div>

                      <div className="col">
                       <strong> Apellidos:</strong> {e.apellidos}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">


                        <strong>Tipo de identificación:</strong>{" "}
                        {_tipoIdentificacion(e.tipo_identificacion)}

                      </div>

                      <div className="col">
                        <strong>Identificación:</strong> {e.identificacion}

                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <strong>Ciudad:</strong> {e.ciudad}
                      </div>
                      <div className="col">

                        <strong>Dirección:</strong> {e.direccion}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                       <strong> Departamento:</strong> {e.departamento}

                      </div>
                    </div>

                    <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        activarEditar(e);
                      }}
                    >
                      Editar
                    </button>

                  </div>

                  <div className="col">
                    <button
                      className="btn btn-danger ml-3"
                      onClick={() => {
                        eliminar(e.id);
                      }}
                    >
                      Eliminar
                    </button>

                  </div>
                </div>
                  </div>
                </div>

                </div>
   
   ))}
   </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Crud;
