import React from "react";
import Pins from "./pins.jsx";
import Scoreboard from "./scoreboard.jsx";

class App extends React.Component{
  render(){
    return (
      <React.Fragment>
        <Pins/>
        <Scoreboard/>
      </React.Fragment>

    )
  }
}

export default App;

