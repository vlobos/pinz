import React from "react";
import Frame from "./frame.jsx";

class Scoreboard extends React.Component {
  constructor(){
    super();
    this.state = {
      frames: [1,2,3,4,5,6,7,8,10]
    }
  }

  render() {
    return (
      <div id="score__board">
      <h3>Scoreboard</h3>
      <div>
        {this.state.frames.map((frame, index)=>{
          return <Frame className="score__frame" id={"frame__"+frame} key={index} frameNum={frame}/>
        })}
      </div>
      </div>
    )
  }
}

export default Scoreboard;