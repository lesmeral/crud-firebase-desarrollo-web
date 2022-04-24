import React, { useState } from "react";

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

  const tipos = [
    { value: "CC", name: "Cédula de ciudadanía" },
    { value: "TI", name: "Tarjeta de identidad" },
    { value: "CE", name: "Cédula de extranjería" },
  ];
  
  return (
    <div className="container container-fluid">
      <h3>Formulario clientes</h3>
      <div className="row">
        <div className="col-md-12">
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
                    onChange={(e) => e.target.selectedOptions[0].value}
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
                  value={id ? "Editar persona" : "Crear persona"}
                />
                <button className="btn btn-success">
                  {id ? "Cancelar" : "Limpiar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crud;
