// import css from './Home.module.css'
import { io } from 'socket.io-client'
import Header from '../components/Header/Header'
import { setUpColorScheme } from '../logic/color-scheme'
import { useEffect } from 'react'
import HomeGamesViewer from '../components/HomeGamesViewer/HomeGamesViewer'
import RoomCreator from '../components/RoomCreator/RoomCreator'
import { serverURL } from '../serverData'

const socket = io(serverURL)

/* global sessionStorage */
const Home = () => {
  useEffect(() => {
    sessionStorage.setItem('username', sessionStorage.getItem('username') ?? 'guest')
  }, [])

  setUpColorScheme()

  const send = () => {
    socket.emit('user-info', {
      user: socket.id
    })
  }

  return (
    <>
      <Header />
      <main>
        <RoomCreator />
        <HomeGamesViewer />
      </main>
      <button onClick={send}>Send user id</button>
    </>
  )
}

export default Home
