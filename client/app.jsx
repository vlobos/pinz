import React from "react";
import Pins from "./pins.jsx";
import Scoreboard from "./scoreboard.jsx";
import "./styles.css"

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      rollScore: [],
      currFrame: 1,
      rollCount: 1
    }
  }

  handlePinSelection=(e)=>{
    let pin= Number(e.target.textContent);
    let currFrame = this.state.currFrame;
    let roll = this.state.rollCount;
    this.renderRollScore(pin,currFrame, roll)
  }

  renderRollScore = (pin, currFrame, roll) => {
    //handle a STRIKE
    //handle 2nd roll
    //handle 1st roll
    //handle 10th Frame
    if(currFrame!=10){
      if(roll===2){
        this.saveScore(pin,roll)
        roll--;
        currFrame++;
        this.setState({
          rollCount: roll,
          currFrame: currFrame
        })
      }else if(roll===1){
        if(pin===10){
          this.saveScore(pin,roll)
          currFrame++;
          this.setState({
            currFrame: currFrame
          })
        }else{
          this.saveScore(pin,roll)
          roll++;
          this.setState({
            rollCount: roll
          })
        }
      }
    }
  }

  saveScore = (pin, roll) =>{
    //handle Strike
    //handle 1st roll
    //handle 2nd roll
    let rollScore = this.state.rollScore;
    
    if(roll===1){
      rollScore.push([pin]);
      this.setState({
        rollScore: rollScore
      })
    }

    if(roll===2 || roll===3){
      rollScore[rollScore.length-1].push(pin);
      this.setState({
        rollScore: rollScore
      })
    }
  }

  render(){
    return (
      <React.Fragment>
        <Scoreboard rollScore={this.state.rollScore} currFrame={this.state.currFrame}/>
        <Pins handlePinSelection={this.handlePinSelection}/>
      </React.Fragment>

    )
  }
}

export default App;

