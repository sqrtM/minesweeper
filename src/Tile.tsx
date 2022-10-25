import React from 'react';
import './Game.scss';

export interface ITileProps {
  isBomb: boolean,
  surroundings: number,
  coordinates: number[],
  clickTile: any,
}

export default class Tile extends React.Component<ITileProps> {
  constructor(props: ITileProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (i: number, j: number) => {
    this.props.clickTile(i, j);
  }

  public render() {
    return (
      <span 
        className='Tile' 
        style={{color: this.props.isBomb ? "red" : "black"}}
        onClick={() => this.handleClick(this.props.coordinates[0], this.props.coordinates[1])}>
        {this.props.surroundings}
      </span>
    );
  }
}