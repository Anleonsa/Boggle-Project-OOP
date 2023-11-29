// import css from './Home.module.css'
import Header from '../components/Header/Header'
import { setUpColorScheme } from '../logic/color-scheme'
import { useEffect } from 'react'
import HomeGamesViewer from '../components/HomeGamesViewer/HomeGamesViewer'
import RoomCreator from '../components/RoomCreator/RoomCreator'

/* global sessionStorage */
const Home = () => {
  useEffect(() => {
    sessionStorage.setItem('username', sessionStorage.getItem('username') ?? 'guest')
  }, [])

  setUpColorScheme()

  return (
    <>
      <Header />
      <main>
        <RoomCreator />
        <HomeGamesViewer />
      </main>
    </>
  )
}

export default Home
