const COLOR_POR_NIVEL = {
  "Muy débil": "#E88A9A",
  "Débil": "#EFC078",
  "Media": "#D9C46A",
  "Fuerte": "#6FA98A",
};

function StrengthMeter({ nivel, puntos }) {
  const color = COLOR_POR_NIVEL[nivel];
  const porcentaje = Math.min((puntos / 5) * 100, 100);

  return (
    <div className="fortaleza">
      <div className="fortaleza-encabezado">
        <span>FORTALEZA</span>
        <strong style={{ color }}>{nivel}</strong>
      </div>
      <div className="fortaleza-barra-fondo">
        <div
          className="fortaleza-barra-relleno"
          style={{ width: `${porcentaje}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default StrengthMeter;