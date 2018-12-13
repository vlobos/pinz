import React from "react";
import Frame from "./frame.jsx";

class Scoreboard extends React.Component {
  constructor(){
    super();
    this.state = {
      frames: [1,2,3,4,5,6,7,8,9,10]
    }
  }

  render() {
    return (
      <section id="score__container">
      <h3>Scoreboard</h3>
      <div id="score__board">
        {this.state.frames.map((frame, index)=>{
          return <Frame index={index} frameNum={frame}/>
        })}
      </div>
      </section>
    )
  }
}

export default Scoreboard;