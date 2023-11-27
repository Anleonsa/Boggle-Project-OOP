export const checkWord = (board, word) => {
  return checkWordCreation(board, word)
}

const checkWordCreation = (board, word) => {
  /*let pivot = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == word[pivot]) {
        while (true) {
          if (board[i][j] )
        }
      }
    }
  }*/
}

const checkWordExistence = (word) => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/es/${word}`)
    .then(response => response.json())
    .then(data => {
      if (data.title === 'No Definitions Found') return false
      else return false
    })
}
