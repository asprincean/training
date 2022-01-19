import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import ReactDOM from 'react-dom';


// function Example() {
//   const [count, setCount] = useState(0);
//   return (
 
//     <div>
//     <p>You clicked {count} times</p>
//     <p>{count}</p> 
//     <button onClick={() => setCount(count + 1)}>
//       Click me
//     </button>
//     </div>
//   );
// }

// export default Example;

// function App() {

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hey there!
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);