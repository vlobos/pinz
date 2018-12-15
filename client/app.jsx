import React from "react";
import Pins from "./pins.jsx";
import Scoreboard from "./scoreboard.jsx";
import "./styles.css"

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
      rollScore: [],
      frameScore: [],
      currFrame: 1,
      rollCount: 1,
      strike: false,
      spare: false,
    }
  }

  handlePinSelection=(e)=>{
    let pin= Number(e.target.textContent);
    let currFrame = this.state.currFrame;
    let roll = this.state.rollCount;

    let pinsLeft = (10 - pin)+1;
    let pinsAvailable = this.state.pinsAvailable.slice(0,pinsLeft);
    if(roll===2 || pin===10){
      this.setState({
        pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10]
      })
    }else{
      this.setState({
        pinsAvailable: pinsAvailable
      })
    }
    console.log("Pins left: ",pinsAvailable);


    this.renderRollScore(pin,currFrame, roll);
  }

  renderRollScore = (pin, currFrame, roll) => {
    //handle 10th Frame
    if(currFrame===10){
      //if roll is one and you get a strike you want to get two more tries
        if(pin===10){
          this.setState({
            strike: true
          })
          this.saveScore(pin,roll);
          roll++;
          this.setState({
            currFrame: currFrame,
            rollCount: roll
          })
        }else {
          if(roll===1){
            this.saveScore(pin,roll)
            roll++;
            this.setState({
              rollCount: roll,
              strike: false,
            })
          }else if (roll===2){
            //TODO: handle the spare!
            //handle regular play
            this.saveScore(pin,roll)
            roll--;
            currFrame++;
            this.setState({
              rollCount: roll,
              currFrame: currFrame,
              strike: false,
            })
          }
        }
    //handle all other frames
    } else {
      //handle 2nd roll
      if(roll===2){
        this.saveScore(pin,roll)
        roll--;
        currFrame++;
        this.setState({
          rollCount: roll,
          currFrame: currFrame,
          strike: false,
        })
      //handle 1st roll
      }else if(roll===1){
        //handle a STRIKE
        if(pin===10){
          this.saveScore(pin,roll)
          currFrame++;
          this.setState({
            currFrame: currFrame,
            strike: true
          })
        }else{
          //handle regular play
          this.saveScore(pin,roll)
          roll++;
          this.setState({
            rollCount: roll,
            strike: false,
          })
        }
      }
    }
  }

  saveScore = (pin, roll) =>{
    //handle Strike
    let rollScore = this.state.rollScore;
    
    //handle 1st roll
    if(roll===1){
      rollScore.push([pin]);
      this.setState({
        rollScore: rollScore
      })
    }
    
    //handle 2nd & 3rd roll
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
        <Pins handlePinSelection={this.handlePinSelection} pinsAvailable={this.state.pinsAvailable}/>
      </React.Fragment>

    )
  }
}

export default App;

