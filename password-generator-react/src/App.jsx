import { useState } from "react";
import PasswordDisplay from "./components/PasswordDisplay";
import LengthSlider from "./components/LengthSlider";
import OptionsCheckboxes from "./components/OptionsCheckboxes";
import StrengthMeter from "./components/StrengthMeter";
import PasswordHistory from "./components/PasswordHistory";
import {
  generarPassword,
  calcularPuntosFortaleza,
  nivelFortaleza,
} from "./utils/password";
import "./App.css";

const OPCIONES_INICIALES = {
  mayusculas: true,
  minusculas: true,
  numeros: true,
  simbolos: false,
};

function App() {
  const [longitud, setLongitud] = useState(10);
  const [opciones, setOpciones] = useState(OPCIONES_INICIALES);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [historial, setHistorial] = useState([]);

  const puntosFortaleza = calcularPuntosFortaleza(longitud, opciones);
  const fortaleza = nivelFortaleza(puntosFortaleza);

  function alternarOpcion(clave) {
    setOpciones((previas) => ({ ...previas, [clave]: !previas[clave] }));
  }

  function manejarGenerar() {
    const hayOpcionActiva = Object.values(opciones).some(Boolean);

    if (!hayOpcionActiva || longitud === 0) {
      setError("Marcá al menos una opción y una longitud mayor a 0");
      return;
    }

    setError("");
    const nuevaPassword = generarPassword(longitud, opciones);
    setPassword(nuevaPassword);
    setHistorial((previo) =>
      [{ id: crypto.randomUUID(), password: nuevaPassword }, ...previo].slice(0, 5)
    );
  }

  function manejarCopiar() {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <main className="pagina">
      <h1>Generador de contraseñas</h1>

      <section className="tarjeta">
        <PasswordDisplay password={password} copiado={copiado} onCopiar={manejarCopiar} />

        <div className="formulario">
          <LengthSlider longitud={longitud} onCambiar={setLongitud} />
          <OptionsCheckboxes opciones={opciones} onToggle={alternarOpcion} />
          <StrengthMeter nivel={fortaleza} puntos={puntosFortaleza} />

          {error && <p className="error">{error}</p>}

          <button type="button" className="boton-generar" onClick={manejarGenerar}>
            GENERAR →
          </button>
        </div>
      </section>

      <PasswordHistory historial={historial} />
    </main>
  );
}

export default App;