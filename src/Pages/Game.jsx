// import css from './Game.module.css'
import { io } from 'socket.io-client'
import { serverURL } from '../serverData'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameHeader from '../components/Header/GameHeader'
import { setUpColorScheme } from '../logic/color-scheme'
import GamePlayersList from '../components/GamePlayersList/GamePlayersList'

const socket = io(serverURL)

/* global sessionStorage */
const Game = () => {
  const [game, setGame] = useState()
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

  return (
    <>
      <GameHeader />
      {game?.b}
      {game?.players ? <GamePlayersList players={game?.players} /> : ''}
    </>

  )
}

export default Game
