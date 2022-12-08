import logo from './logo.svg';
import './App.css';
import NavBar from "./NavBar";


function App() {
  // const pizza = 56;
  const mylink = "/about.js";
  return (
    <div className="App">
      <header className="App-header">
         <p className="text-center">Welcome to BCA - Alumni.</p>
      </header>
      <NavBar link={mylink}></NavBar>
    </div>
  );
}

export default App;
