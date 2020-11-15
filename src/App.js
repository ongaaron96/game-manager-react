import logo from './logo.svg';
import './App.css';
import GameList from './components/gameList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Game Manager App
        </h1>
      </header>

      <GameList />
    </div>
  );
}

export default App;
