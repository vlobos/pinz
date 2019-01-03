import React from "react";

class PlayersScores extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log("PROPS : ",this.props)
    return(
      <React.Fragment>
        <div>HIGH SCORES</div>
        <ul>
          {this.props.pastScores.map((element, index)=>{
            return(
              <li>
                <div>{element.player}</div>
                <div>{element.score}</div>
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}

export default PlayersScores;