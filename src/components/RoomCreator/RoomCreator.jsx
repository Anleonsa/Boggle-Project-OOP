import { useState } from 'react'
import css from './RoomCreator.module.css'
import { io } from 'socket.io-client'
import { serverURL } from '../../serverData'
import { useNavigate } from 'react-router-dom'

const socket = io(serverURL)

/* global sessionStorage */
const RoomCreator = () => {
  const [boardSize, setBoardSize] = useState(4)
  const [duration, setDuration] = useState(2)
  const [roundsNumber, setRoundsNumber] = useState(7)

  const navigate = useNavigate()

  const updateBoardSize = e => {
    setBoardSize(e.target.value)
  }
  const updateRoundsNumber = e => {
    setRoundsNumber(e.target.value)
  }
  const updateDuration = e => {
    setDuration(e.target.value)
  }

  const createGame = e => {
    e.preventDefault()
    socket.on(socket.id, roomId => {
      sessionStorage.setItem('playing-room', roomId)
      navigate('/game')
    })
    socket.emit('create-game', {
      game: { boardSize, roundsNumber, duration },
      creator: socket.id
    })
  }

  return (
    <section className={css.roomCreator}>
      <div className={css.roomCreator_titleContainer}>
        <h2 className={css.roomCreator__title}>Crea una sala</h2>
      </div>
      <div className={css.roomCreator__formContainer}>
        <form className={css.roomCreator__form} onSubmit={createGame}>
          <div className={css.roomCreator__form__optionContainer}>
            <label>Tamaño de la cuadrícula</label>
            <input type='range' value={boardSize} onChange={updateBoardSize} min={3} max={5} />
            <span className={css.roomCreator__form__optionViewer}>{boardSize} x {boardSize}</span>
          </div>
          <div className={css.roomCreator__form__optionContainer}>
            <label>Cantidad de rondas</label>
            <input type='range' value={roundsNumber} onChange={updateRoundsNumber} min={1} max={20} />
            <span className={css.roomCreator__form__optionViewer}>{roundsNumber}</span>
          </div>
          <div className={css.roomCreator__form__optionContainer}>
            <label>Tiempo de juego en minutos</label>
            <input type='range' value={duration} onChange={updateDuration} min={1} max={5} />
            <span className={css.roomCreator__form__optionViewer}>{duration}</span>
          </div>
          <input className={css.roomCreator_btnSubmit + ' clickable'} type='submit' value='Crear' />
        </form>
      </div>
    </section>
  )
}

export default RoomCreator
