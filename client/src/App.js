import './App.css';
import { useState, useEffect } from "react";
import Navbar from './Navbar';
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Admin from './pages/Admin';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(()=>{
    //Kontroll, kas kasutaja on sisse logitud
    const sessionstorageGetInformation=sessionStorage.getItem('isLoggedIn')
     if(sessionstorageGetInformation === '1'){
       setLoginStatus(true)
     }
  },[])

  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break;
    case "/login":
      component = <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      break;
    case "/admin":
      if (!loginStatus) {
        component = <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      } 
      else {
        component = <Admin loginStatus={loginStatus}/>
      }
      break;
    default:  
  }

  return (
    <>
      <Navbar loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      {component}
    </>
  );
}

export default App;
