import ColorSchemeSwitch from '../ColorSchemeSwitch/ColorSchemeSwitch'
import css from './Header.module.css'

/* global sessionStorage */
const GameHeader = () => {
  return (
    <header className={css.header}>
      <h1 className={css.header__title}>Boggle</h1>
      <ColorSchemeSwitch />
      <span style={{
        color: '#fff',
        fontSize: '18px'
      }}
      >{sessionStorage.getItem('username')}
      </span>
    </header>
  )
}

export default GameHeader
