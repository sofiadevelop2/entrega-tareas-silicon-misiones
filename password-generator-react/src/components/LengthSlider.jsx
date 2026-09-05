function LengthSlider({ longitud, onCambiar }) {
  return (
    <div className="fila-slider">
      <div className="fila-slider-encabezado">
        <span>Longitud</span>
        <strong>{longitud}</strong>
      </div>
      <input
        type="range"
        min="0"
        max="20"
        value={longitud}
        onChange={(e) => onCambiar(Number(e.target.value))}
      />
    </div>
  );
}

export default LengthSlider;
