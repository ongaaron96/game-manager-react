import React, { Component } from 'react';
import './gameList.css';

class GameItem extends Component {

  render() {
    const game = this.props.game;

    return (
      <div className="gameItem">
        <h2>{game.title}</h2>
        <p>Platform: {game.platform}</p>
        <p>{game.owned ? "You already own this game!" : "You do not own this game"}</p>
        <p>{game.played ? "You have already played this game!" : "You have not played this game"}</p>
        <p>Rating: {game.rating}</p>
      </div>
    );
  }
}

export default GameItem;