import React from 'react';
import './Game.scss';
import Tile from './Tile';

type square = { isBomb: boolean, surroundings: number }

const bomb: square = {
  isBomb: true,
  surroundings: 0,
}

const notBomb: square = {
  isBomb: false,
  surroundings: 0,
}

function determineSurroundingbombs(board: number[][]) {
  let objBoard: square[][];
  for (let i = 1; i < board.length - 1; i++) {
    for (let j = 0; j < board[i].length - 1; j++) {
      if (board[i][j] === 1) {
        for (let k = i - 1; k < i + 1; k++) {
          for (let l = j - 1; l < j + 1; l++) {
            if ((k >= 0 && l >= 0) && (k < board.length - 1 && l < board[i].length - 1)) {
              board[k][l] = board[k][l] + 1;
            }
          }
        }
        board[i][j] = 0;
      }
    }
  }
  return board;
}

export interface IBoardProps {
  boardArray: number[][],
}


export default class Board extends React.Component<IBoardProps> {


  newBoard = determineSurroundingbombs(this.props.boardArray);

  public render() {
    return (
      <div id='Board'>
        {this.props.boardArray.map((i, index) => {
          return (
            <div key={`key-${index}`}>
              {(this.props.boardArray[index].map(j => <Tile value={j} />))}
            </div>
          );
        })}
      </div>
    );
  }
}