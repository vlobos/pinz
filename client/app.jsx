import React from "react";
import Pins from "./pins.jsx";
import Scoreboard from "./scoreboard.jsx";
import PlayersScores from "./playersScores.jsx";
import axios from "axios";

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
      endGame: false,
      emptyInput: false,
      scores: [{id:5, player: "SURY", score: 150}]
    }
  }

  componentDidMount=()=>{
    this.getScores();
  }

  getScores=()=>{
    axios.get("/scores")
    .then((results)=>{
      let scores = results.data
      this.setState({
        scores: scores
      })
    })
    .catch((err)=>{
      if(err) throw err;
    })
  }

  getGameScores=()=>{
    //check for empty input
    let inputText = document.getElementById("player__input").value;
    if(inputText === ""){
      this.setState({
        emptyInput: true
      })
    }else{
      //get player game
      let player = document.getElementById("player__input").value;
      document.getElementById("player__input").value = "";
      //get scoreboard scores
      let totalScore;
      let gameData = [player]
      for(let i=1; i<=10; i++){
        let rollOne = document.getElementById("roll__one__"+i).innerHTML;
        let rollTwo = document.getElementById("roll__two__"+i).innerHTML;
        let rollScore = document.getElementById("score__"+i).innerHTML;
        let rollThree;
        if(i===10){
          totalScore = rollScore
          rollThree = document.getElementById("roll__three__"+i).innerHTML;
        } 
        if(rollThree){
          gameData.push(JSON.stringify([rollOne,rollTwo,rollThree,rollScore]))
        } else {
          gameData.push(JSON.stringify([rollOne,rollTwo,rollScore]))
        }
      }
      gameData.push(totalScore);
      this.postGame(gameData);
    }
  }

  postGame=(gameData)=>{
    axios.post("/scores",{
      game: gameData
    })
    .then((res)=>{
      this.setState({
        pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
        rollScore: [],
        frameScore: [],
        currFrame: 1,
        rollCount: 1,
        strike: false,
        spare: false,
        emptyInput: false,
        endGame: false
      })
    })
    .then(()=>{
      this.getScores();
    })
    .catch((err)=>{
      if(err) throw err;
    })
  }

  handlePinSelection=(e)=>{
    if(!this.state.endGame){
      let pin= Number(e.target.textContent);
      let currFrame = this.state.currFrame;
      let roll = this.state.rollCount;
      let pinsLeft = (10 - pin)+1;
      let pinsAvailable = this.state.pinsAvailable.slice(0,pinsLeft);
      if(currFrame===10){
        if(roll==1){
          if(pin===10){
            this.setState({
              pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10]
            })
          }else{
            this.setState({
              pinsAvailable: pinsAvailable
            })
          }
        }
        if(roll===2 && this.state.endGame===false){
          if(pin===10){
            this.setState({
              pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10]
            })
          }else{
            if(this.state.strike===false){
              this.setState({
                pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
                endGame: true
              })
            }else{
              this.setState({
                pinsAvailable: pinsAvailable
              })
            }
          }
        }
        if(roll===3){
          this.setState({
            pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10],
            endGame: true
          })
        }
      }else{
        if(roll===2 || pin===10){
          this.setState({
            pinsAvailable: [0,1,2,3,4,5,6,7,8,9,10]
          })
        }else{
          this.setState({
            pinsAvailable: pinsAvailable
          })
        }
      }
      this.renderRollScore(pin,currFrame, roll);
    }
  }

  renderRollScore = (pin, currFrame, roll) => {
    //handle 10th Frame
    if(currFrame===10){
      //if roll is one and you get a strike you want to get two more tries
        if(pin===10){
          this.saveRollScore(pin,roll);
          roll++;
          this.setState({
            currFrame: currFrame,
            rollCount: roll,
            strike: true
          })
        }else {
          if(roll===1){
            this.saveRollScore(pin,roll)
            roll++;
            this.setState({
              rollCount: roll,
              strike: false,
            })
          }else if (roll>=2){
            if(this.state.strike){
              this.saveRollScore(pin,roll)
              roll++;
              this.setState({
                rollCount: roll,
                strike: false
              })
            }else{
              this.saveRollScore(pin,roll);
              //handle spare
              let lastRolls = this.state.rollScore[this.state.rollScore.length-1]
              if(lastRolls[0]+lastRolls[1]===10){
                roll++;
                this.setState({
                  rollCount: roll,
                  strike: false,
                  endGame: false
                })
              }else{
                roll--;
                this.setState({
                  rollCount: roll,
                  strike: false,
                })
              }
            }
          }
        }
    //handle all other frames
    } else {
      //handle 2nd roll
      if(roll===2){
        this.saveRollScore(pin,roll)
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
          this.saveRollScore(pin,roll)
          currFrame++;
          this.setState({
            currFrame: currFrame,
            strike: true
          })
        }else{
          //handle regular play
          this.saveRollScore(pin,roll)
          roll++;
          this.setState({
            rollCount: roll,
            strike: false,
          })
        }
      }
    }
  }

  saveRollScore = (pin, roll) =>{

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
      });
    }
    this.calculateScore(pin,roll);
  }

  calculateScore=(pin, roll)=>{
    let rollScore = this.state.rollScore;
    let currentFirstRoll = Number(rollScore[rollScore.length-1][0]) || 0;
    let currentSecondRoll = Number(rollScore[rollScore.length-1][1]);
    let frameScore = this.state.frameScore;
    let previousFrameScore = Number(frameScore[frameScore.length-1]) || 0;
    let currentScore = pin + currentFirstRoll + previousFrameScore;

    let previousRollScores = rollScore[rollScore.length-2] || 0;
    let prevFirstRoll = previousRollScores[0];
    let prevSecondRoll  = previousRollScores[1];

    let previousRollTotal = prevFirstRoll+prevSecondRoll;

    if(currentFirstRoll+currentSecondRoll===10){
      console.log("SPARE! WOOOO!")
      if(roll===2 && prevFirstRoll===10){
        frameScore.push(previousFrameScore+10+currentFirstRoll+currentSecondRoll);
      };
    }else if(pin===10){
      console.log("STRIKE!!! YEAH!!!");
    }else if(roll===2 && prevFirstRoll===10){
      if(this.state.currFrame!=10){
        frameScore.push(previousFrameScore+10+currentFirstRoll+currentSecondRoll);
        if(roll===2){
          frameScore.push(currentScore+10+pin+currentFirstRoll)
        };
      }else{
        frameScore.push(frameScore[frameScore.length-1]+ prevFirstRoll+currentFirstRoll+pin);
        if(currentFirstRoll+currentSecondRoll!=10){
          frameScore.push(frameScore[frameScore.length-1]+currentFirstRoll+pin);
          this.setState({
            endGame: true
          })
        }
      };
    } else if (roll===2){
      if(this.state.currFrame!=10){
        frameScore.push(currentScore);
      }else{
        frameScore.push(currentScore);
      };
    };


    if (roll===3){
      if(pin===10){
        frameScore.push(frameScore[frameScore.length-1]+pin+currentFirstRoll+currentSecondRoll);
      }
      frameScore.push(frameScore[frameScore.length-1]+pin+currentFirstRoll+currentSecondRoll);
      this.setState({
        endGame: true
      });
      console.log(this.state.endGame, "Is it over??")
    };

    if(roll===1){
      let secondToLast= rollScore[rollScore.length-3] || 0;
      let initializingStrike = secondToLast[0] || 0;
      if(previousRollTotal===10){
        frameScore.push(previousFrameScore+ previousRollTotal + pin)
      }else if(initializingStrike===10 && prevFirstRoll===10){
        if(pin===10){
          frameScore.push(currentScore+10);
        }else{
          frameScore.push(frameScore[frameScore.length-1]+prevFirstRoll+initializingStrike+pin);
        }
      }
    };

    this.setState({
      frameScore: frameScore
    })
  };

  render(){
    return (
      <React.Fragment>
        <header><h1>Pinz</h1></header>
        <PlayersScores pastScores={this.state.scores}/>
        <div id="main__container">
          {this.state.emptyInput &&
            <div className="alert">OOPS! Please type a PLAYER name!</div>
          }
          {this.state.endGame && 
            <div className="alert">PLAYER: 
              <input id="player__input" autocomplete="off" type="text"></input>
              <button onClick={this.getGameScores}>Save game!</button>
            </div>
          }
          <Pins handlePinSelection={this.handlePinSelection} pinsAvailable={this.state.pinsAvailable}/>
          <Scoreboard frameScore={this.state.frameScore} rollScore={this.state.rollScore} currFrame={this.state.currFrame}/>
        </div>
      </React.Fragment>
    )
  }
}

export default App;

