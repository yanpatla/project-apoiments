import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  //!Citas en LocalStorage

  let citasIniciaes = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciaes) {
    citasIniciaes = [];
  }

  //!Array de Citas
  const [citas, guardarCitas] = useState(citasIniciaes);

  //!Use Effect para realizar ciertas operaciones cuando el state cambia

  useEffect(() => {
    if (citasIniciaes) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citas]);

  //! Crear una Funcion que Tome las Citas Actuales y Agregue las Nuevas
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  //! Funcion que Elimina una Cita por ID

  const eliminarCita = (id) => {
    const nuevasCita = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCita);
  };

  //! Mensaje Condicional
  const titulo = citas.length === 0 ? "No Hay Citas" : "Administra tus Citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes </h1>
      <div calssName="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
