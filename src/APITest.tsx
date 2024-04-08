
import React from "react";
import "./App.css";

function APITest() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3001/test")
      .then((res) => res.json())
      .then((data) => setData(data.user.firstname));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default APITest;