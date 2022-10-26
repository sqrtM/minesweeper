import React from 'react';
import { square } from './Game';
import './Game.scss';
import Tile from './Tile';

/*
something is deeply wrong with this and it counts everything twice.
strict mode doesn't allow function declarations inside of functions,
so I have this fucked up for loop mess. I'm nearly certain that's the
cause of it. until I can find a solution, I am incrementing each time 
by 0.5 to get around the 'counting twice' thing. horrible, i know.


EDIT : for some reason, it works as normal on the production build, but
not on the regular npm start build. extremely odd. 
*/
function determineSurroundingbombs(board: square[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j][0]) {
        for (let k = i - 1; k <= (i + 1); k++) {
          for (let l = j - 1; l <= (j + 1); l++) {
            if ((k >= 0 && l >= 0) && (k < board.length && l < board[k].length)) {
              board[k][l][1] = board[k][l][1]++;
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
  flagged: Function,
  firstClick: Function,
}


export default class Board extends React.Component<IBoardProps> {
  constructor(props: IBoardProps) {
    super(props);
    this.tileClicked = this.tileClicked.bind(this)
  }

  newBoard = determineSurroundingbombs(this.props.boardArray);

  shouldComponentUpdate(nextProps: { boardArray: square[][]; }): boolean {
    if (nextProps.boardArray !== this.props.boardArray) {
      this.newBoard = determineSurroundingbombs(this.props.boardArray);
      return true;
    } else {
      return false;
    }
  }

  tileClicked = (i: number, j: number, s: number, r: string) => {
    this.props.firstClick();
    if (r === 'click') {
      if (!s) {
        for (let k = i - 1; k <= (i + 1); k++) {
          for (let l = j - 1; l <= (j + 1); l++) {
            if ((k >= 0 && l >= 0) && (k < this.newBoard.length && l < this.newBoard[k].length)) {
              if (this.newBoard[i][j][1] === 0 && this.newBoard[k][l][2] === false) {
                this.newBoard[k][l][2] = true;
                this.tileClicked(k, l, this.newBoard[k][l][1], "click");
              }
              this.newBoard[k][l][2] = true;
            }
          }
        }
        this.newBoard[i][j][2] = true;
      }
      this.newBoard[i][j][2] = true;
      this.forceUpdate();
      return this.newBoard;
    } else {
      this.newBoard[i][j][3] = !this.newBoard[i][j][3];
      this.newBoard[i][j][3] ? this.props.flagged(true) : this.props.flagged(false)
      this.forceUpdate();
      return this.newBoard;
    }
  }

  public render() {
    return (
      <div id='Board' onContextMenu={(e)=> e.preventDefault()}>
        {this.newBoard.map((i, index) => {
          return (
            <div key={`key-${index}`} className='BoardRow'>
              {(this.newBoard[index].map((j, jndex) =>
                <Tile
                  key={`key-${jndex}`}
                  isBomb={j[0]}
                  surroundings={j[1]}
                  clicked={j[2]}
                  coordinates={[index, jndex]}
                  flagged={j[3]}
                  clickTile={this.tileClicked}
                />))}
            </div>
          );
        })}
      </div>
    );
  }
}
