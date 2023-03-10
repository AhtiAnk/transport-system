import './App.css';
import Navbar from './Navbar';
import Home from './pages/Home.js'
import Login from './pages/Login.js'

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break;
    case "/login":
      component = <Login />
      break;
    default:  
  }

  return (
    <>
      <Navbar />
      {component}
    </>
  );
}

export default App;
