import { React } from 'react'
import styles from './board.module.css';
// for single board
function Board(props) {
  let value = props.element
  // mark in ever square board
  function mark()
  {
    const boardValue = props.isCircle? 'O': 'X' 
    if(!value)
    {
      props.updateBoard(props.rowIndex, props.columnIndex, boardValue)
    }
  }
  return (
    <button className={styles.squareBox} disabled={props.hasWinner} onClick={mark}>
      {value}
    </button>
  );
}

export default Board;