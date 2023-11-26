import { useState } from 'react'
import css from './HeaderUser.module.css'

const HeaderUser = ({ name }) => {
  const [userName, setUserName] = useState(name)
  const [editing, setEditing] = useState(false)

  const updateTempName = (e) => {
    setUserName(e.target.value)
  }
  const cancelEditName = () => {
    setUserName(name)
    setEditing(false)
  }
  const updateName = (e) => {
    e.preventDefault()
    // Code to update name
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
              <button className={css.headerEditNameBtn + ' clickable'} onClick={() => setEditing(true)}>Edit</button>
            </>
            )
        }
      </div>
    </>
  )
}
export default HeaderUser
