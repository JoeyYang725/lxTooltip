import logo from './logo.svg';
import './App.css';
import Tooltip from './tooltip'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Tooltip title='123' placement='left' trigger='hover'>
          <button style={{margin:'50px auto'}}>fdsafads</button>
        </Tooltip>
      </header>
    </div>
  );
}

export default App;
