import React from 'react';
import { square } from './Game';
import './Game.scss';
import Tile from './Tile';

/*
something is deeply wrong with this and it counts everything twice.
strict mode doesn't allow function declarations inside of functions,
so I have this fucked up for loop mess. I'm nearly certain that's the
cause of it. until I can find a solution, I am incrementing each time by 0.5
to get around the 'counting twice' thing. horrible, i know.
*/
function determineSurroundingbombs(board: square[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j][0]) {
        for (let k = i - 1; k <= (i + 1); k++) {
          for (let l = j - 1; l <= (j + 1); l++) {
            if ((k >= 0 && l >= 0) && (k < board.length && l < board[k].length)) {
              console.log(board[k][l][1], j, l)
              board[k][l][1] = board[k][l][1] + 0.5;
            }
          }
        }
      }
    }
  }
  return board;
}

export interface IBoardProps {
  boardArray: square[][],
}


export default class Board extends React.Component<IBoardProps> {
  constructor(props: IBoardProps) {
    super(props);

    this.tileClicked = this.tileClicked.bind(this)
  }


  newBoard = determineSurroundingbombs(this.props.boardArray);

  tileClicked = (i: number, j: number) => {
    this.newBoard[i][j][2] = true;
  }

  public render() {
    return (
      <div id='Board'>
        {this.newBoard.map((i, index) => {
          return (
            <div key={`key-${index}`}>
              {(this.newBoard[index].map((j, jndex) => 
              <Tile 
              isBomb={j[0]} 
              surroundings={j[1]} 
              coordinates={[index, jndex]}
              clickTile={this.tileClicked(index, jndex)}
              />))}
            </div>
          );
        })}
      </div>
    );
  }
}