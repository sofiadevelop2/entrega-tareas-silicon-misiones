function PasswordHistory({ historial }) {
  if (historial.length === 0) return null;

  return (
    <div className="historial">
      <span className="historial-titulo">Últimas generadas</span>
      <ul>
        {historial.map((entrada) => (
          <li key={entrada.id}>{entrada.password}</li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordHistory;
