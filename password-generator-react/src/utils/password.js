export const OPCIONES_INFO = {
  mayusculas: { etiqueta: "Incluir mayúsculas", caracteres: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  minusculas: { etiqueta: "Incluir minúsculas", caracteres: "abcdefghijklmnopqrstuvwxyz" },
  numeros: { etiqueta: "Incluir números", caracteres: "0123456789" },
  simbolos: { etiqueta: "Incluir símbolos", caracteres: "!@#$%^&*" },
};

export function construirAlfabeto(opciones) {
  return Object.entries(opciones)
    .filter(([, activa]) => activa)
    .map(([clave]) => OPCIONES_INFO[clave].caracteres)
    .join("");
}

export function generarPassword(longitud, opciones) {
  const alfabeto = construirAlfabeto(opciones);
  if (!alfabeto || longitud <= 0) return "";

  let resultado = "";
  for (let i = 0; i < longitud; i++) {
    resultado += alfabeto[Math.floor(Math.random() * alfabeto.length)];
  }
  return resultado;
}

export function calcularPuntosFortaleza(longitud, opciones) {
  const tiposActivos = Object.values(opciones).filter(Boolean).length;
  const bonusLongitud = longitud >= 12 ? 1 : 0;
  return tiposActivos + bonusLongitud;
}

export function nivelFortaleza(puntos) {
  if (puntos <= 1) return "Muy débil";
  if (puntos === 2) return "Débil";
  if (puntos === 3) return "Media";
  return "Fuerte";
}
