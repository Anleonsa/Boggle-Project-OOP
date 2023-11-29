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
    running: 'running',
    betweenRounds: 'betweenRounds',
    finished: 'finished'
  }

  const startGame = () => {
    socket.emit('start-game', sessionStorage.getItem('playing-room'))
  }

  // Update state with onChange
  const updateWord = e => {
    setWrittenWord(e.target.value)
  }

  const addWord = word => {
    socket.emit('add-word-in-game', {
      room: sessionStorage.getItem('playing-room'),
      playerId: sessionStorage.getItem('game-player-id'),
      word
    })
    socket.emit('sync-game', {
      room: sessionStorage.getItem('playing-room')
    })
  }

  const submitWord = async e => {
    e.preventDefault()
    const data = await checkWord(game.board, writtenWord.toUpperCase())
    if (
      data &&
      writtenWord.length >= 3 &&
      !(game.players[sessionStorage.getItem('game-player-id')].words.includes(writtenWord.toLowerCase())) // Check that the player doesn't already have the word
    ) {
      // Send word to list
      addWord(writtenWord.toLowerCase())
      setWrittenWord('')
    }
  }

  const exitGame = () => {
    sessionStorage.removeItem('game-player-id')
    sessionStorage.removeItem('playing-room')
    navigate('/')
  }

  // Find maxScore
  /* let maxScore = 0
  if (game?.status === POSSIBLE_GAME_STATUS.finished) {
    Object.values(game.players).forEach(player => {
      if (player.points > maxScore) maxScore = player.points
    })
  } */

  return (
    <>
      <GameHeader />
      <main className={css.gameMain}>
        <div className={css.gameFlexContainer}>
          <div className={css.gameBoardContainer}>
            {
              game?.status === POSSIBLE_GAME_STATUS.open
                ? <div className={css.gameWaitingMsg}>Esperando a qué comienze la partida</div>
                : ''
            }
            {
              (game?.status === POSSIBLE_GAME_STATUS.running && game?.board)
                ? (
                  <>
                    <div className={css.roundsAndTimerContainer}>
                      <span className={css.gameRoundNumber}>Ronda #{game?.currentRound} de {game?.roundsNumber} rondas</span>
                      <span className={css.gameTimer}>{game?.timeLeft}</span>
                    </div>
                    <GameBoard board={game.board} status={game.status} />
                  </>
                  )
                : ''
            }
            {
              game?.status === POSSIBLE_GAME_STATUS.betweenRounds
                ? (
                  <>
                    <span className={css.gameRoundNumber}>Ronda #{game?.currentRound} de {game?.roundsNumber} rondas</span>
                    <span className={css.gameBetweenRoundsMsg}>Resultados de la ronda</span>
                  </>
                  )
                : ''
            }
            {
              game?.status === POSSIBLE_GAME_STATUS.finished
                ? (
                  <>
                    <span className={css.gameFinishedMsg}>Juego finalizado</span>
                    <span className={css.gameBetweenRoundsMsg}>Resultados del juego</span>
                  </>
                  )
                : ''
            }
          </div>
          {game?.players ? <GamePlayersList players={game?.players} /> : ''}
        </div>
        {
          (sessionStorage.getItem('game-player-id') === '1' && game?.status === POSSIBLE_GAME_STATUS.open)
            ? <button className={`${css.gameStartBtn} clickable`} onClick={startGame}>Iniciar juego</button>
            : ''
        }
        {
          (game?.status === POSSIBLE_GAME_STATUS.running)
            ? (
              <>
                <form className={css.formWord} onSubmit={submitWord}>
                  <input type='text' className={css.gameInputWord} placeholder='Escribe la palabra' onChange={updateWord} value={writtenWord} />
                  <input type='submit' className={css.gameSubmitWordBtn} />
                </form>
                <h2 className={css.gameFoundWordsTitle}>Palabras encontradas</h2>
                <div className={css.wordsListContainer}>
                  {game?.players[sessionStorage.getItem('game-player-id')].words.map((word, index) =>
                    <span className={css.wordListWord} key={index}>{word}</span>
                  )}
                </div>
              </>
              )
            : ''
        }
        {
          (game?.status === POSSIBLE_GAME_STATUS.betweenRounds)
            ? (
              <>
                <div className={css.gameBetweenRoundsResultsContainer}>
                  {Object.entries(game.players).map(([playerId, player]) =>
                    <GameBetweenRoundsPlayerResultsCard key={playerId} playerId={playerId} player={player} />
                  )}
                </div>
              </>
              )
            : ''
        }
        {
          game?.status === POSSIBLE_GAME_STATUS.finished
            ? (
              <>
                <div className={css.gameFinalResultsCardsContainer}>
                  {Object.entries(game.players).map(([playerId, player]) =>
                    <GameFinalResultsCard player={player} key={playerId} />
                  )}
                </div>
                <button className={css.gameFinalBtnExit} onClick={exitGame}>Salir de la partida</button>
              </>
              )
            : ''
        }
      </main>
    </>
  )
}

const GameBetweenRoundsPlayerResultsCard = ({ player, playerId }) => {
  return (
    <div className={css.gameBetweenRoundsPlayerResultsCard}>
      <span className={css.gameBetweenRoundsResultsCardPlayerName}>{player.name}</span>
      {player.words.map((word, index) =>
        <span className={css.gameBetweenRoundsResultsCardWord} key={`${playerId}${index}`}>{word}</span>
      )}
      <span className={css.gameBetweenRoundsResultsCardPoints}>Puntos: {player.roundPoints}</span>
    </div>
  )
}

const GameFinalResultsCard = ({ player }) => {
  return (
    <div className={`${css.gameFinalResultsCard}`}>
      <span className={css.gameFinalResultCardName}>{player.name}</span>
      <span className={css.gameFinalResultCardScore}>Puntaje: {player.points}</span>
    </div>
  )
}

export default Game
