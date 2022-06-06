import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {
  const [distance, setDistance] = useState(100)

  const handleChange = e => {
    
    setDistance(parseInt(e.target.value))
  }
  return (
    <div className="App">
      <label>Distance: 
      <input type="range" value={distance} onChange={(e) => handleChange(e)}/>
      {distance}
      </label>
    </div>
  );
}

export default App;
