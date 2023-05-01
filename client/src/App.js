import './App.css';
import Navbar from './Navbar';
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Admin from './pages/Admin';

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break;
    case "/login":
      component = <Login />
      break;
    case "/admin":
      component = <Admin />
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
