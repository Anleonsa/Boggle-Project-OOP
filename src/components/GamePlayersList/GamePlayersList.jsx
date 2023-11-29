import css from './GamePlayersList.module.css'

/* global sessionStorage */
const GamePlayersList = ({ players }) => {
  return (
    <aside className={css.aside}>
      <div className={css.gamePlayersList}>
        <h2 className={css.gamePlayersListTitle}>Jugadores</h2>
        <ul className={css.gamePlayersListUl}>
          {Object.entries(players).map(([key, player]) =>
            <li className={css.gamePlayersListLi} key={key}>{player.name}</li>
          )}
        </ul>
      </div>
      <div className={css.ownScoreContainer}>
        <h3 className={css.ownScoreTitle}>Puntuación propia actual</h3>
        <span className={css.ownScore}>{players[sessionStorage.getItem('game-player-id')].points}</span>
      </div>
    </aside>
  )
}

export default GamePlayersList
