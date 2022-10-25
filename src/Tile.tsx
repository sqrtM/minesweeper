import React from 'react';
import './Game.scss';

export interface ITileProps {
  value: any,

}

export default class Tile extends React.Component<ITileProps> {

  public render() {
    return (
      <span className='Tile'>
        {this.props.value}
      </span>
    );
  }
}