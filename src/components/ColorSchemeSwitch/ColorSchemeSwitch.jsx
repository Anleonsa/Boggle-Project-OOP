import { toggleColorScheme } from '../../logic/color-scheme'
// import { useState } from 'react'
import css from './ColorSchemeSwitch.module.css'

const ColorSchemeSwitch = () => {
  // const [colorScheme, setColorScheme] = useState(() => document.body.getAttribute('color-scheme') ?? 'light')
  return (
    <div className={css.colorSchemeSwitch} onClick={() => toggleColorScheme()}>
      <div className={css.colorSchemeBall} />
    </div>
  )
}

export default ColorSchemeSwitch
