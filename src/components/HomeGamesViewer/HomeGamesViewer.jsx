import css from './HomeGamesViewer.module.css'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { serverURL } from '../../serverData'

const socket = io(serverURL)

const HomeGamesViewer = () => {
  const [games, setGames] = useState({})

  useEffect(() => {
    socket.on('data-games', data => {
      setGames(data)
    })
    return () => socket.off('data-games')
  }, [])

  return (
    <section className={css.gamesViewer}>
      {Object.keys(games).length !== 0
        ? Object.entries(games).map(([id, game]) => {
          return (
            <GameCard
              id={id}
              boardSize={game.boardSize}
              roundsNumber={game.roundsNumber}
              duration={game.duration}
              key={id}
            />
          )
        })
        : (
          <span className={css.gamesViewerMsg}>
            No hay partidas iniciadas
          </span>
          )}
    </section>
  )
}

const GameCard = ({ id, boardSize, roundsNumber, duration }) => {
  return (
    <div className={css.gameCard}>
      <div className={`${css.gameCardItem} ${css.gameCardItem_id}`}>
        <span>Número de sala</span>
        <span className={`${css.gameCardValue} ${css.gameCardId}`}>{id}</span>
      </div>
      <div className={css.gameCardItem}>
        <span>Tamaño de la cuadrícula:</span>
        <span className={css.gameCardValue}>{boardSize} x {boardSize}</span>
      </div>
      <div className={css.gameCardItem}>
        <span>Número de rondas:</span>
        <span className={css.gameCardValue}>{roundsNumber}</span>
      </div>
      <div className={css.gameCardItem}>
        <span>Duración por ronda:</span>
        <span className={css.gameCardValue}>{duration} minutos</span>
      </div>
    </div>
  )
}

export default HomeGamesViewer
