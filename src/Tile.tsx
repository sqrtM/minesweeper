import React from 'react';
import './Game.scss';

export interface ITileProps {
  isBomb: boolean,
  surroundings: number,
  coordinates: number[],
  clicked: boolean,
  clickTile: any,
  flagged: boolean,
}

export default class Tile extends React.Component<ITileProps> {
  constructor(props: ITileProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (i: number, j: number, s: number, r: string) => {
    this.props.clickTile(i, j, s, r);
  }

  public render() {
    return (
      <span 
        onContextMenu={ (e): void => this.handleClick(this.props.coordinates[0], this.props.coordinates[1], this.props.surroundings, e.type) } 
        className='Tile' 
        style={ { color: this.props.isBomb && this.props.clicked ? "red" : "black" } }
        onClick={ (e): void => this.handleClick(this.props.coordinates[0], this.props.coordinates[1], this.props.surroundings, e.type) }
      >
        { this.props.flagged ? "^" : 
        this.props.clicked && this.props.isBomb ? "*" : 
        this.props.clicked && !this.props.isBomb && this.props.surroundings > 0 ? this.props.surroundings :
        this.props.clicked && !this.props.isBomb ? "." :
        "#" }
      </span>
    );
  }
}