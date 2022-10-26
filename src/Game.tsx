import React from 'react';
import './Game.scss';
import Board from './Board';

export type square = [
  bomb: boolean, 
  surroundings: number, 
  clicked: boolean, 
  flagged: boolean
];

let buildBoard = (c: number, r: number, b: number) => {
  let arr: square[][] = Array.from({ length: r }, () =>
    Array.from({ length: c }, () => [false, 0, false, false] ));
  let seeds = 0;
  let i = Math.floor(Math.random() * c);
  let j = Math.floor(Math.random() * r);
  while (seeds < b) {
    if (!arr[i][j][0]) {
      arr[i][j][0] = true;
      seeds++;
      i = Math.floor(Math.random() * c);
      j = Math.floor(Math.random() * r);
    } else {
      i = Math.floor(Math.random() * c);
      j = Math.floor(Math.random() * r);
    }
  }
  console.log(arr)
  return arr;
};

const abc = buildBoard(20,20,40);

export interface IGameProps {
}

export interface IGameState {
  col: number;
  row: number;

  bombs: number;

  boardArray: square[][]
}

export default class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props);

    this.state = {
      col: 20,
      row: 20,

      bombs: 40,

      boardArray: [...abc],
    }
  }

  public render() {
    return (
      <div id='Game'>
        <Board boardArray={this.state.boardArray} />
      </div>
    );
  }
}