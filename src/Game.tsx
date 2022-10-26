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

  let arr: square[][] = Array.from({ length: r }, () => Array.from({ length: c }, () => [false, 0, false, false]));

  let i = Math.floor(Math.random() * r);
  let j = Math.floor(Math.random() * c);

  let seeds = 0;

  while (seeds < b) {
    if (!arr[i][j][0]) {
      arr[i][j][0] = true;
      seeds++;
      i = Math.floor(Math.random() * r);
      j = Math.floor(Math.random() * c);
    } else {
      i = Math.floor(Math.random() * r);
      j = Math.floor(Math.random() * c);
    }
  }
  return arr;
};

const abc = buildBoard(16, 16, 40);

export interface IGameProps {
}

export interface IGameState {
  col: number,
  row: number,
  bombs: number,
  flags: number,

  boardArray: square[][],

  firstClick: boolean,
  timer: number
}

export default class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props);

    this.state = {
      col: 16,
      row: 16,
      bombs: 40,
      flags: 0,

      boardArray: [...abc],
      firstClick: false,
      timer: 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tileFlagged = this.tileFlagged.bind(this);
    this.firstClickCheck = this.firstClickCheck.bind(this);
  }

  countUp = setInterval(() => {
    if (this.state.firstClick) {
      let lastTime = this.state.timer;
      this.state.bombs - this.state.flags === 0 ? alert('winner :)') :
      this.setState({
        ...this.state,
        timer: lastTime + 1,
      })
    }
  }, 1000);

  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (this.state.bombs >= this.state.col * this.state.row) { alert("too many bombs :("); return 0; }
    this.setState({
      ...this.state,
      boardArray: buildBoard(this.state.col, this.state.row, this.state.bombs),
    });
  }


  handleChange = (e: { target: { name: any; value: any; }; }) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  tileFlagged = (b: boolean) => {
    b ?
      this.setState({
        ...this.state,
        flags: this.state.flags + 1,
      })
      :
      this.setState({
        ...this.state,
        flags: this.state.flags - 1,
      })
  }

  firstClickCheck = () => {
    if (!this.state.firstClick) {
      this.setState({
        ...this.state,
        firstClick: true,
      })
    }
  }

  public render() {
    return (
      <div>
        <div id='Game'>
          <span id="HUD">
            {this.state.bombs - this.state.flags}
            -------
            {this.state.timer}
          </span>
          <Board boardArray={this.state.boardArray} flagged={this.tileFlagged} firstClick={this.firstClickCheck}/>
        </div>
        <div id='Inputs'>
          <form onSubmit={this.handleSubmit}>
            <label>
              rows:
              <input type="text" name="row" value={this.state.row} onChange={this.handleChange} />
              columns:
              <input type="text" name="col" value={this.state.col} onChange={this.handleChange} />
              bombs:
              <input type="text" name="bombs" value={this.state.bombs} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}