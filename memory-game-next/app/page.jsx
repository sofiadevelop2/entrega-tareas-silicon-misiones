"use client"

import { useEffect, useState } from "react"

function crearTablero(tamano = 4) {
  const cantidadPares = (tamano * tamano) / 2
  const valores = Array.from({ length: cantidadPares }, (_, i) => i + 1)
  const duplicados = [...valores, ...valores]

  // Fisher-Yates: recorro de atrás hacia adelante intercambiando con una posicion al azar
  for (let i = duplicados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[duplicados[i], duplicados[j]] = [duplicados[j], duplicados[i]]
  }

  return duplicados.map((valor, id) => ({
    id,
    valor,
    dadaVuelta: false,
    encontrada: false,
  }))
}

function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60)
  const resto = segundos % 60
  return `${minutos}:${String(resto).padStart(2, "0")}`
}

export default function Home() {
  const [tamano, setTamano] = useState(4)
  const [tablero, setTablero] = useState(() => crearTablero(4))
  const [evaluando, setEvaluando] = useState(false)
  const [movimientos, setMovimientos] = useState(0)
  const [segundos, setSegundos] = useState(0)
  const [jugando, setJugando] = useState(false)

  const gano = tablero.every((ficha) => ficha.encontrada)

  // Recibe el tamano por parametro: al cambiar de grilla el estado "tamano"
  // todavia no esta actualizado cuando se llama desde cambiarTamano
  function reiniciarPartida(nuevoTamano = tamano) {
    setTablero(crearTablero(nuevoTamano))
    setMovimientos(0)
    setSegundos(0)
    setJugando(false)
    setEvaluando(false)
  }

  function cambiarTamano(nuevoTamano) {
    setTamano(nuevoTamano)
    reiniciarPartida(nuevoTamano)
  }

  function manejarClic(id) {
    if (evaluando) return

    // El timer arranca con el primer clic valido de la partida
    if (!jugando) {
      const ficha = tablero.find((f) => f.id === id)
      if (ficha && !ficha.dadaVuelta && !ficha.encontrada) setJugando(true)
    }

    setTablero((anterior) => {
      // Chequeo contra "anterior" (el tablero mas fresco que tiene React) y no
      // contra la variable de este render, asi clics muy rapidos seguidos no
      // pueden dar vuelta una tercera ficha con un tablero desactualizado
      const ficha = anterior.find((f) => f.id === id)
      if (!ficha || ficha.dadaVuelta || ficha.encontrada) return anterior

      const volteadas = anterior.filter((f) => f.dadaVuelta && !f.encontrada)
      if (volteadas.length >= 2) return anterior

      return anterior.map((f) => (f.id === id ? { ...f, dadaVuelta: true } : f))
    })
  }

  useEffect(() => {
    const volteadas = tablero.filter((f) => f.dadaVuelta && !f.encontrada)
    if (volteadas.length !== 2) return

    const [primera, segunda] = volteadas
    const sonPar = primera.valor === segunda.valor
    const ids = [primera.id, segunda.id]

    // El guard real contra un tercer clic ya vive dentro del updater de
    // manejarClic; "evaluando" es una proteccion extra y necesita setearse aca,
    // que es justo lo que la regla nueva de React 19 desaconseja en general.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvaluando(true)

    const temporizador = setTimeout(
      () => {
        setTablero((anterior) =>
          anterior.map((f) =>
            ids.includes(f.id)
              ? { ...f, dadaVuelta: false, encontrada: sonPar }
              : f
          )
        )
        // Un movimiento es haber completado la evaluacion de un par, coincida o no
        setMovimientos((anterior) => anterior + 1)
        setEvaluando(false)
      },
      sonPar ? 500 : 800
    )

    return () => clearTimeout(temporizador)
  }, [tablero])

  useEffect(() => {
    if (!jugando) return

    const intervalo = setInterval(() => {
      setSegundos((anterior) => anterior + 1)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [jugando])

  useEffect(() => {
    if (!gano) return
    // Frena el timer: el efecto de arriba depende de "jugando" y limpia su intervalo.
    // Mismo caso que setEvaluando: la regla pide derivar en vez de guardar en estado.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJugando(false)
  }, [gano])

  return (
    <main>
      <header>
        <h1>memory</h1>
        <div className="controles">
          <button
            className={tamano === 4 ? "activo" : ""}
            onClick={() => cambiarTamano(4)}
          >
            4x4
          </button>
          <button
            className={tamano === 6 ? "activo" : ""}
            onClick={() => cambiarTamano(6)}
          >
            6x6
          </button>
          <button onClick={() => reiniciarPartida()}>Nueva partida</button>
        </div>
      </header>

      <section
        className="grilla"
        style={{ gridTemplateColumns: `repeat(${tamano}, 1fr)` }}
      >
        {tablero.map((ficha) => (
          <button
            key={ficha.id}
            className="ficha"
            onClick={() => manejarClic(ficha.id)}
          >
            {ficha.dadaVuelta || ficha.encontrada ? ficha.valor : ""}
          </button>
        ))}
      </section>

      {gano && (
        <div className="pantallaFinal">
          <h2>¡Lo lograste!</h2>
          <p>Tiempo: {formatearTiempo(segundos)}</p>
          <p>Movimientos: {movimientos}</p>
          <button onClick={() => reiniciarPartida()}>Jugar de nuevo</button>
        </div>
      )}

      <footer>
        <div className="tarjeta">
          <span>Tiempo</span>
          <strong>{formatearTiempo(segundos)}</strong>
        </div>
        <div className="tarjeta">
          <span>Movimientos</span>
          <strong>{movimientos}</strong>
        </div>
      </footer>
    </main>
  )
}
