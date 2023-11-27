import css from './GamePlayersList.module.css'

const GamePlayersList = ({ players }) => {
  return (
    <aside className={css.gamePlayersList}>
      <h2 className={css.gamePlayersListTitle}>Jugadores</h2>
      <ul className={css.gamePlayersListUl}>
        {Object.entries(players).map(([key, player]) =>
          <li className={css.gamePlayersListLi} key={key}>{player.name}</li>
        )}
      </ul>
    </aside>
  )
}

export default GamePlayersList
