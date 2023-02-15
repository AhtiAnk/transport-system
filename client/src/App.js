import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [buildings, setBuildings] = useState([]);


  const getBuildings = () => {
    Axios.get("http://localhost:3001/buildings").then((response) => {
      setBuildings(response.data);
    });
  };

  useEffect(() => {
    getBuildings();
  },[])

  return (
    <div className="App">
      {buildings.map((val, key) => {
        return <div>
          {val.name} | {val.address}
        </div>
      })}
    </div>
  );
}

export default App;
