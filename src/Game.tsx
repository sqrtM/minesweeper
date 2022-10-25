import React from 'react';
import './Game.scss';
import Board from './Board';

let buildBoard = (c: number, r: number, b: number) => {
  let arr = Array.from({ length: r }, () =>
    Array.from({ length: c }, () => 0));

  let seeds = 0;
  let i = Math.floor(Math.random() * c);
  let j = Math.floor(Math.random() * r);
  while (seeds < b) {
    if (!arr[i][j]) {
      arr[i][j] = 1;
      seeds++;
      i = Math.floor(Math.random() * c);
      j = Math.floor(Math.random() * r);
    }
  }
  
  return arr;
};

const abc = buildBoard(9,9,10);

export interface IGameProps {
}

export interface IGameState {
  col: number;
  row: number;

  bombs: number;

  boardArray: number[][]
}

export default class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props);

    this.state = {
      col: 9,
      row: 9,

      bombs: 10,

       boardArray: [...abc],
    }
  }

  public render() {
    return (
      <div id='Game'>
        hello world
        <Board boardArray={this.state.boardArray} />
      </div>
    );
  }
}