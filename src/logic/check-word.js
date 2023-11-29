export const checkWord = async (board, word) => {
  if (checkWordCreation(board, word)) {
    const res = await checkWordExistence(word)
    return res
  } else return false
}

const checkWordCreation = (board, word) => {
  const rows = board.length
  const columns = board[0].length

  // filas
  function dfs (i, j, k) {
    if (i < 0 || j < 0 || i >= rows || j >= columns) {
      return false
    }
    if (board[i][j] !== word[k]) {
      return false
    }
    if (k === word.length - 1) {
      return true
    }
    const temp = board[i][j]
    board[i][j] = '/'
    const res = dfs(i - 1, j, k + 1) ||
                dfs(i + 1, j, k + 1) ||
                dfs(i, j - 1, k + 1) ||
                dfs(i, j + 1, k + 1) ||
                dfs(i - 1, j - 1, k + 1) ||
                dfs(i - 1, j + 1, k + 1) ||
                dfs(i + 1, j - 1, k + 1) ||
                dfs(i + 1, j + 1, k + 1)
    board[i][j] = temp
    return res
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (dfs(i, j, 0)) {
        return true
      }
    }
  }
  return false
}

const checkWordExistence = async (word) => {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
  const data = await res.json()
  return data?.title !== 'No Definitions Found'
}

/* fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
    .then(response => response.json())
    .then(data => {
      if (data.title === 'No Definitions Found') return false
      else return true
    }) */
