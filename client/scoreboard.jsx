import React from "react";
import Frame from "./frame.jsx";

class Scoreboard extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let frames = [1,2,3,4,5,6,7,8,9,10]
    return (
      <section id="score__container">
      <h3>Scoreboard</h3>
      <div id="score__board">
        {frames.map((frame, index)=>{
          //if the score exists at index, return Frame with that score
          let rollScore = [];
          if(this.props.rollScore[index]){
            rollScore = this.props.rollScore[index];
            return <Frame key={index} frameNum={frame} rollScore={rollScore} currFrame={this.props.currFrame}/>
          }else if(!this.props.rollScore[index]){
            return <Frame key={index} frameNum={frame} rollScore={rollScore} currFrame={this.props.currFrame}/>
          }
        })}
      </div>
      </section>
    )
  }
}

export default Scoreboard;