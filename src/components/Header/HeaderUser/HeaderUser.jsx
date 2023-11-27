import { useState } from 'react'
import css from './HeaderUser.module.css'

/* global sessionStorage */
const HeaderUser = () => {
  const [userName, setUserName] = useState(() => {
    sessionStorage.setItem('username', sessionStorage.getItem('username') ?? 'Guest')
    return sessionStorage.getItem('username')
  })
  const [editing, setEditing] = useState(false)

  const updateTempName = (e) => {
    setUserName(e.target.value)
  }
  const cancelEditName = () => {
    sessionStorage.setItem('username', sessionStorage.getItem('username') ?? 'guest')
    setUserName(sessionStorage.getItem('username'))
    setEditing(false)
  }
  const updateName = (e) => {
    e.preventDefault()
    sessionStorage.setItem('username', sessionStorage.getItem('username') ?? 'guest')
    if (userName === '') {
      setEditing(false)
      setUserName(sessionStorage.getItem('username'))
    }
    sessionStorage.setItem('username', userName)
    setEditing(false)
  }

  return (
    <>
      <div className={css.headerUser}>
        {
        editing
          ? (
            <>
              <form onSubmit={updateName} className={css.headerFormEditName}>
                <input type='text' className={css.headerFormInputName} value={userName} onChange={updateTempName} />
                <input type='button' className={css.headerCancelNameBtn + ' clickable'} value='X' onClick={cancelEditName} />
                <input type='submit' className={css.headerAcceptNameBtn + ' clickable'} value='✔' />
              </form>
            </>
            )
          : (
            <>
              <span className={css.userName}>{userName}</span>
              <button className={css.headerEditNameBtn + ' clickable'} onClick={() => setEditing(true)}>Cambiar nombre</button>
            </>
            )
        }
      </div>
    </>
  )
}
export default HeaderUser
