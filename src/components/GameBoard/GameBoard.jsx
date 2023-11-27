import css from './GameBoard.module.css'

const GameBoard = ({ board, status }) => {
  const POSSIBLE_GAME_STATUS = {
    open: 'open',
    started: 'started'
  }

  return (
    <>
      {status === POSSIBLE_GAME_STATUS.started ? <Board board={board} /> : <div className={css.gameWaitingMsg}>Esperando a qué comienze la partida</div>}
    </>
  )
}

const Board = ({ board }) => {
  let keys = 1
  return (
    <div
      className={css.gameBoard} style={{
        gridTemplateColumns: `repeat(${board.length}, 1fr)`,
        gridTemplateRows: `repeat(${board.length}, 1fr)`,
        maxWidth: `${board.length * 100}px`
      }}
    >
      {board.map(list =>
        list.map(cell =>
          <div key={keys++} className={css.gameBoardCell}>{cell}</div>
        )
      )}
    </div>
  )
}

export default GameBoard
