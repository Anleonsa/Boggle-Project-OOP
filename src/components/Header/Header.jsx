import ColorSchemeSwitch from '../ColorSchemeSwitch/ColorSchemeSwitch'
import css from './Header.module.css'
import HeaderUser from './HeaderUser/HeaderUser'

const Header = () => {
  return (
    <header className={css.header}>
      <h1 className={css.header__title}>Boggle</h1>
      <ColorSchemeSwitch />
      <HeaderUser name='Anfelesan' />
    </header>
  )
}

export default Header
