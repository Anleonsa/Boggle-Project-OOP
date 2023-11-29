import css from './GameBoard.module.css'

const GameBoard = ({ board, status }) => {
  return (
    <Board board={board} />
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
