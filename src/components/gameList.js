import React, { Component } from 'react';
import GameItem from './gameItem';
import './gameList.css';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
const API_URL = PROXY_URL + 'https://lucid-torvalds-0e8644.netlify.app/.netlify/functions/api/games';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      gameList: [],
      message: "",
      newTitle: "",
      newPlatform: "",
      newOwned: false,
      newPlayed: false,
      newRating: 0
    }

    this.getAllGames = this.getAllGames.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.createGame = this.createGame.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getAllGames();
  }

  getAllGames() {
    console.log("Getting all games...");

    this.setState({
      isLoaded: false
    });

    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            message: result.message,
            gameList: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  createGame() {
    this.setState({
      isLoaded: false
    });

    var formBody = [];
    var encodedKey = encodeURIComponent("title");
    var encodedValue = encodeURIComponent(this.state.newTitle);
    formBody.push(encodedKey + "=" + encodedValue);
    encodedKey = encodeURIComponent("platform");
    encodedValue = encodeURIComponent(this.state.newPlatform);
    formBody.push(encodedKey + "=" + encodedValue);
    encodedKey = encodeURIComponent("owned");
    encodedValue = encodeURIComponent(this.state.newOwned);
    formBody.push(encodedKey + "=" + encodedValue);
    encodedKey = encodeURIComponent("played");
    encodedValue = encodeURIComponent(this.state.newPlayed);
    formBody.push(encodedKey + "=" + encodedValue);
    encodedKey = encodeURIComponent("rating");
    encodedValue = encodeURIComponent(this.state.newRating);
    formBody.push(encodedKey + "=" + encodedValue);
    formBody = formBody.join("&");

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      cache: 'no-cache',
      credentials: 'same-origin',
      body: formBody
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            message: result.message
          });
          this.getAllGames();
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
          });
          this.getAllGames();
        }
      )
  }

  deleteGame(game_id) {
    this.setState({
      isLoaded: false
    });

    fetch(API_URL + '/' + game_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            message: result.message
          });
          this.getAllGames();
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [target.name]: value
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <h3>Loading all Game info...</h3>
          <p>(this might take a minute...)</p>
        </div>
      );
    }

    if (this.state.error) {
      return <h3>{this.state.error.message}</h3>;
    }

    return this.state.isLoaded && (
      <div>
        <div className="info">
          <h2>All your stored Game information is listed below:</h2>
          <button
            type="button"
            onClick={this.getAllGames}
            className="btn btn-primary"
          >
            Refresh all Game info
          </button>
        </div>

        <div className="alert alert-primary" role="alert">
          {this.state.message}
        </div>

        <ul className="list-group">
          {this.state.gameList.map(game =>
            <li key={game._id} className="list-group-item">
              <GameItem game={game} />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.deleteGame(game._id)}>
                Delete this game info
              </button>
            </li>)}
        </ul>

        <div>
          <h3>Create a new game info here</h3>
          <form>
            <label>
              Title:
              <input
                name="newTitle"
                type="text"
                value={this.state.newTitle}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Platform:
              <input
                name="newPlatform"
                type="text"
                value={this.state.newPlatform}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Game owned?
              <input
                name="newOwned"
                type="checkbox"
                checked={this.state.newOwned}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Game played?
              <input
                name="newPlayed"
                type="checkbox"
                checked={this.state.newPlayed}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Rating:
              <input
                name="newRating"
                type="number"
                value={this.state.newRating}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={this.createGame}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default GameList;