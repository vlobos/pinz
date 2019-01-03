import React from "react";

class PlayersScores extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <React.Fragment>
        <div id="high__scores">
          <div id="high__scores__title">HIGH SCORES</div>
          <div className="high__scores__list">
            <ul>
              {this.props.pastScores.map((element, index)=>{
                return(
                  <li className="high__scores__li">
                    <div className="high__scores__div">{element.player}</div>
                    <div className="high__scores__div">{element.score}</div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default PlayersScores;