import { io } from 'socket.io-client'
import Header from './components/Header/Header'
import { setUpColorScheme } from './logic/color-scheme'
import HomePanelContainer from './components/HomePanel/HomePanelContainer'

const socket = io('http://localhost:8080')

const App = () => {
  setUpColorScheme()

  const send = () => {
    socket.emit('user-info', {
      user: socket.id
    })
  }

  return (
    <>
      <Header />
      <HomePanelContainer />
      <button onClick={send}>Send user id</button>
    </>
  )
}

export default App
