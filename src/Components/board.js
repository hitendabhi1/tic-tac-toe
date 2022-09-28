import React, { useState } from 'react';

function Board() {

  const boardInit = [[],[],[],[],[],[],[],[],[]]

  const [board, setBoard] = useState(boardInit);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(false);

  const addTic = (boardCopy, cellIndex) => {
    boardCopy[cellIndex] = 'X'
    return boardCopy;
  }

  const addTac = (boardCopy, cellIndex) => {
    boardCopy[cellIndex] = 'O'
    return boardCopy;
  }

  const addMarker = (cellIndex) => {

    let boardCopy = [...board];

    if (boardCopy[cellIndex].length !== 0) return

    if (turn % 2 === 1) {
      setBoard(addTic(boardCopy, cellIndex))
    } else {
      setBoard(addTac(boardCopy, cellIndex))
    }
    
    let newTurn = turn + 1

    setTurn(newTurn)
    calcWinner(boardCopy);
  }


  const calcWinner = (board) => {

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningConditions.forEach((winCondition, conditionIndex) => {
      
      let a = board[winCondition[0]];
      let b = board[winCondition[1]];
      let c = board[winCondition[2]];

      if (a === b && b === c) {
        if (a === 'X') {
          setWinner('X winner');
        } else {
          setWinner('O winner');
        }
      }
    })
  }


  return (
    <>
      <div className='board'>
        {board.map((cell, cellIndex) => (
          <div className='cell' key={cellIndex} onClick={() => addMarker(cellIndex)}>
            {cell.length !== 0 ? cell === 'X' ? 'X' : 'O' : ''}
          </div>
        ))}
      </div>
      {
        winner && (
          <div className="winner">WINNER: { winner }</div>
        )
      }
    </>
  )
}

export default Board;