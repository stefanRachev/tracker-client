import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState("");


  useEffect(() => {
    
    fetch("http://localhost:5001/") 
      .then((res) => res.text()) 
      .then((data) => setData(data)) 
      .catch((err) => console.error("Error:", err)); 
    
      
  }, []); 
  console.log(data);

  return (
    <div>
      <h1>API Test</h1>
      <p>Data from backend: {data}</p> 
    </div>
  );
}

export default App;
