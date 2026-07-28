// PARTE A: array de valores simples
console.log("--- PARTE A ---");

// 01. Array con al menos cuatro categorías
let categorias = ["acción", "comedia", "terror", "drama"];

// 02. Mostrar el array completo y la cantidad de elementos (.length)
console.log(categorias);
console.log("Cantidad de categorías:", categorias.length);

// 03. Primer elemento y último
let primeraCategoria = categorias[0];
let ultimaCategoria = categorias[categorias.length - 1];
console.log("Primera categoría:", primeraCategoria);
console.log("Última categoría:", ultimaCategoria);

// 04. Incorporar una categoría con .push() y mostrar la nueva cantidad
categorias.push("aventura");
console.log("Cantidad de categorías:", categorias.length);

// 05. Eliminar el último elemento con .pop(), guardarlo e informarlo
let categoriaEliminada = categorias.pop();
console.log("Categoría eliminada:", categoriaEliminada);


// PARTE B: objeto
console.log("--- PARTE B ---");

// 06. Objeto usuario, al menos cuatro propiedades
let usuario = {
  nombre: "Ana",
  edad: 25,
  ciudad: "Posadas",
  temaFavorito: "películas"
};

// 07. Frase construida accediendo con notación de punto
console.log(`Nombre: ${usuario.nombre} — Edad: ${usuario.edad} — Ciudad: ${usuario.ciudad}`);
console.log(`Tema favorito: ${usuario.temaFavorito}`);

// 08. Modificar una propiedad existente y mostrar el resultado
usuario.edad = 26;
console.log("Edad actualizada:", usuario.edad);

// 09. Incorporar una propiedad nueva y mostrar el objeto completo
usuario.profesion = "estudiante";
console.log(usuario);


//PARTE C: array de objetos
console.log("--- PARTE C ---");

// 10. Array catalogo con al menos cuatro objetos con estructura homogénea
let catalogo = [
  { titulo: "Matrix", categoria: "acción", puntaje: 9, visto: true },
  { titulo: "Superbad", categoria: "comedia", puntaje: 8, visto: true },
  { titulo: "El Conjuro", categoria: "terror", puntaje: 7, visto: false },
  { titulo: "Titanic", categoria: "drama", puntaje: 8, visto: true }
];

// 11. Título del primer elemento y puntaje del tercero, accediendo por índice
console.log("Primer título:", catalogo[0].titulo);
console.log("Puntaje del tercer elemento:", catalogo[2].puntaje);

// 12. Línea descriptiva del segundo elemento
let estadoSegundo = catalogo[1].visto ? "visto" : "pendiente";
console.log(`${catalogo[1].titulo} — ${catalogo[1].categoria} — ${catalogo[1].puntaje}/10 — ${estadoSegundo}`);

// 13. Modificar el puntaje de un elemento y mostrar el valor actualizado
catalogo[0].puntaje = 10;
console.log("Puntaje actualizado:", catalogo[0].puntaje);

// 14. Incorporar un quinto elemento con .push() y mostrar la cantidad total
catalogo.push({ titulo: "Interestelar", categoria: "ciencia ficción", puntaje: 9, visto: false });
console.log("Cantidad de elementos del catálogo:", catalogo.length);


//PARTE D: destructuring
console.log("--- PARTE D ---");

// 15. Destructuring de objeto sobre el primer elemento del catálogo
let { titulo, categoria, puntaje, visto } = catalogo[0];
let estadoPrimero = visto ? "visto" : "pendiente";
console.log(`${titulo} — ${categoria} — ${puntaje}/10 — ${estadoPrimero}`);

// 16. Destructuring de objeto sobre usuario (nombre y ciudad)
let { nombre, ciudad } = usuario;
console.log(`Nombre: ${nombre} — Ciudad: ${ciudad}`);

// 17. Destructuring de array sobre catalogo (primer y segundo elemento)
let [primero, segundo] = catalogo;
console.log("Primero:", primero.titulo);
console.log("Segundo:", segundo.titulo);


//PARTE E: complementaria
console.log("--- PARTE E ---");

// 18. Renombrado en el destructuring
let { titulo: tituloDestacado } = catalogo[2];
console.log("Título destacado:", tituloDestacado);

// 19. Valor por defecto para una propiedad inexistente
let { profesionSecundaria = "sin datos" } = usuario;
console.log("Profesión:", profesionSecundaria);

// 20. Intercambio de variables con destructuring de array, sin variable auxiliar
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log(`Valores intercambiados: b = ${b}, a = ${a}`);