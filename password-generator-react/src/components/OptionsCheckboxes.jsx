import { OPCIONES_INFO } from "../utils/password";

function OptionsCheckboxes({ opciones, onToggle }) {
  return (
    <div className="opciones">
      {Object.entries(OPCIONES_INFO).map(([clave, { etiqueta }]) => (
        <label key={clave} className="opcion">
          <input
            type="checkbox"
            checked={opciones[clave]}
            onChange={() => onToggle(clave)}
          />
          {etiqueta}
        </label>
      ))}
    </div>
  );
}

export default OptionsCheckboxes;
