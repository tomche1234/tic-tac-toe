import { React, useState } from 'react'
import Board from './board'
import styles from './boards.module.css';
// for the whole game board
function Boards() {
  const boards = [
    ['', '', ''], ['', '', ''], ['', '', '']
  ]
  const [gameBoards, updateGameBoards] = useState(boards)
  const [isCircle, setIsCircle] = useState(false)
  const [hasWinner, setHasWinner] = useState(false)
  const [status, setStatus] = useState('Current player: X')
  const [steps, setSteps] = useState(1)
  const totalSize = gameBoards.length * gameBoards[0].length
  // updating board value
  function updateBoard(rowIndex, columnIndex, value)
  {
    let newGaneBoard = [...gameBoards]
    newGaneBoard[rowIndex][columnIndex] = value
    updateGameBoards(newGaneBoard)
    setIsCircle(!isCircle)
    setSteps(prev => prev + 1)
    console.log(`current steps: ${steps}, total size: ${totalSize}`)
    checkGameStatus(isCircle)
  }
  function checkGameStatus(isCircle)
  {
    const hasWinner = checkWinners()
    setHasWinner(hasWinner)
    const player = !isCircle && !hasWinner
    ? 'O'
    : 'X'
    const statusString = hasWinner
    ? `Winner player: ${player}`
    : steps !== totalSize
      ? `Current player: ${player}`
      : 'draw!!!'
    setStatus(statusString)
  }

  function checkWinners()
  {
    let hasWinner = false
    const totalRow = gameBoards.length
    const totalColumn = gameBoards[0].length
    hasWinner = checkRow(totalRow, totalColumn)
    if(hasWinner)
    {
      return hasWinner
    }
    hasWinner = checkColumn(totalRow, totalColumn)
    if(hasWinner)
    {
      return hasWinner
    }
    hasWinner = checkDiagonal(totalRow)
    if(hasWinner)
    {
      return hasWinner
    }
    return hasWinner
  }
  // check row win
  function checkRow(totalRow, totalColumn)
  {
    for(let i = 0; i < totalRow; i++)
    {
      for(let j = 0; j < totalColumn - 1; j++)
      {
        if(!gameBoards[i][j])
        {
          break
        }
        if(gameBoards[i][j] !== gameBoards[i][j + 1])
        {
          break
        }
        if(j + 1 === totalColumn - 1)
        {
          return true
        }
      }
    }
  }
  // check column win
  function checkColumn(totalRow, totalColumn)
  {
    for(let j = 0; j < totalColumn; j++)
    {
      for(let i = 0; i < totalRow - 1; i++)
      {
        if(!gameBoards[i][j])
        {
          break
        }
        if(gameBoards[i][j] !== gameBoards[i + 1][j])
        {
          break
        }
        if(i + 1 === totalRow - 1)
        {
          return true
        }
      }
    }
  }
  // check diagonal win
  function checkDiagonal(totalRow)
  {
    for(let i = 0; i < totalRow - 1; i++)
    {
      if(!gameBoards[i][i])
      {
        break
      }
      if(gameBoards[i][i] !== gameBoards[i + 1][i + 1])
      {
        break
      }
      if(i + 1 === totalRow - 1)
      {
        return true
      }
    }
    for(let i = 0; i < totalRow - 1; i++)
    {
      if(!gameBoards[i][totalRow - i - 1])
      {
        break
      }
      if(gameBoards[i][totalRow - i - 1] !== gameBoards[i + 1][totalRow - i - 2])
      {
        break
      }
      if(i + 1 === totalRow - 1)
      {
        return true
      }
    }
  }
  // reset the table
  function reset()
  {
    updateGameBoards(boards)
    setIsCircle(false)
    setHasWinner(false)
    setSteps(1)
    setStatus('Current player: X')
  }
  const props = {
    isCircle: isCircle,
    hasWinner: hasWinner,
    updateBoard: updateBoard
  }
  return (
    <>
      <div>{status}</div>
      <div>
        <button onClick={reset}>reset</button>
      </div>
      {gameBoards.map((row, rowIndex) => (
        <div key={`${rowIndex}`} className={styles.rowBoards}>
          {row.map((element, elementIndex) => <Board key={`${elementIndex}`} element={element} rowIndex={rowIndex} columnIndex={elementIndex} {... props}/>)}
        </div>
      ))}
    </>
  );
}

export default Boards;