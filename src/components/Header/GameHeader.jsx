import ColorSchemeSwitch from '../ColorSchemeSwitch/ColorSchemeSwitch'
import css from './Header.module.css'

const GameHeader = () => {
  return (
    <header className={css.header}>
      <h1 className={css.header__title}>Boggle</h1>
      <ColorSchemeSwitch />
    </header>
  )
}

export default GameHeader
