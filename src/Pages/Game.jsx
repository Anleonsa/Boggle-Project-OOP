import css from './Game.module.css'
import { io } from 'socket.io-client'
import { serverURL } from '../serverData'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameHeader from '../components/Header/GameHeader'
import { setUpColorScheme } from '../logic/color-scheme'
import GamePlayersList from '../components/GamePlayersList/GamePlayersList'
import GameBoard from '../components/GameBoard/GameBoard'
import { checkWord } from '../logic/check-word'

const socket = io(serverURL)

/* global sessionStorage */
const Game = () => {
  const [game, setGame] = useState()
  const [writtenWord, setWrittenWord] = useState()
  const navigate = useNavigate()

  setUpColorScheme()

  useEffect(() => {
    if (
      (
        sessionStorage.getItem('playing-room') === null &&
        sessionStorage.getItem('specting-room') === null
      ) ||
      sessionStorage.getItem('username') === null
    ) {
      navigate('/')
    }
  }, [])

  // Get player id and create player if its neccesary create user at the room
  useEffect(() => {
    if (
      sessionStorage.getItem('game-player-id') === null &&
      sessionStorage.getItem('playing-room') !== null &&
      sessionStorage.getItem('username') !== null
    ) {
      socket.on(socket.id, playerId => {
        sessionStorage.setItem('game-player-id', playerId)
        socket.off(socket.id)
      })

      socket.emit('add-player', {
        playerData: {
          name: sessionStorage.getItem('username')
        },
        connectionId: socket.id,
        room: sessionStorage.getItem('playing-room')
      })
    }
  }, [])

  // Subscribe to event to listening the game
  useEffect(() => {
    if ((sessionStorage.getItem('playing-room') ?? sessionStorage.getItem('specting-room')) != null) {
      socket.on(`game-${sessionStorage.getItem('playing-room') ?? sessionStorage.getItem('specting-room')}`, gameData => {
        setGame(gameData)
        console.log(gameData)
      })

      return () => {
        socket.off(`game-${sessionStorage.getItem('playing-room') ?? sessionStorage.getItem('specting-room')}`)
      }
    }
  }, [])

  // Sync with server
  useEffect(() => {
    if ((sessionStorage.getItem('playing-room') ?? sessionStorage.getItem('specting-room')) != null) {
      socket.emit('sync-game', {
        room: sessionStorage.getItem('playing-room') ?? sessionStorage.getItem('specting-room')
      })
    }
  }, [])

  const POSSIBLE_GAME_STATUS = {
    open: 'open',
    started: 'started'
  }

  const startGame = () => {
    socket.emit('start-game', sessionStorage.getItem('playing-room'))
  }

  const updateWord = e => {
    setWrittenWord(e.target.value)
  }

  const submitWord = e => {
    e.preventDefault()
    if (checkWord(game.board, writtenWord)) {
      window.alert('Good la palabra macho')
      // socket.emit('add-written-word')
    }
  }

  return (
    <>
      <GameHeader />
      <main className={css.gameMain}>
        <div className={css.gameFlexContainer}>
          <div className={css.gameBoardContainer}>
            {game?.board ? <GameBoard board={game.board} status={game.status} /> : ''}
          </div>
          {game?.players ? <GamePlayersList players={game?.players} /> : ''}
        </div>
        {
          (sessionStorage.getItem('game-player-id') === '1' && game?.status === POSSIBLE_GAME_STATUS.open)
            ? <button className={`${css.gameStartBtn} clickable`} onClick={startGame}>Iniciar juego</button>
            : ''
        }
        <form className={css.formWord} onSubmit={submitWord}>
          <input type='text' className={css.gameInputWord} placeholder='Escribe la palabra' onChange={updateWord} />
          <input type='submit' className={css.gameSubmitWordBtn} />
        </form>
      </main>
    </>

  )
}

export default Game
