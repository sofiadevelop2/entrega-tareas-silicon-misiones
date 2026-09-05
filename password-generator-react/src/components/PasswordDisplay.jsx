function PasswordDisplay({ password, copiado, onCopiar }) {
  return (
    <div className="visor">
      <input
        type="text"
        readOnly
        value={password}
        placeholder="P4$5W0rD!"
        aria-label="Contraseña generada"
      />
      <button type="button" onClick={onCopiar} className="boton-copiar">
        📋 Copiar
      </button>
      {copiado && <span className="aviso-copiado">¡Copiado!</span>}
    </div>
  );
}

export default PasswordDisplay;
