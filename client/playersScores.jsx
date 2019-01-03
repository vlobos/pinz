import React from "react";

class PlayersScores extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log("PROPS : ",this.props)
    return(
      <React.Fragment>
        <div id="high__scores">
          <div id="high__scores__title">HIGH SCORES</div>
          <ul className="high__scores__list">
            {this.props.pastScores.map((element, index)=>{
              return(
                <li>
                  <div>{element.player}</div>
                  <div>{element.score}</div>
                </li>
              )
            })}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

export default PlayersScores;