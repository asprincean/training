import logo from './logo.svg';
import './App.css';

function App() {
  const name = 'Alex';
  let age = 25;
  let workplace = 'Leicester';
  workplace = 'London';

console.log(`After few months ${name} will live in ${workplace}`);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey there!
        </p>
        <p>After few months {name} will live in {workplace}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
