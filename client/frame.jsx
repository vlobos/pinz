import React from 'react';

class Frame extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    if(this.props.frameNum===10){
      return (
        <div className="frame" id={"frame__"+this.props.frameNum}  >
          <div className="frame__num">{this.props.frameNum}</div>
          <div className="frame__scores">
            <div className="roll tl_extra roll__one">{this.props.rollScore[0]}</div>
            <div className="roll tc_extra roll__two">{this.props.rollScore[1]}</div>
            <div className="roll tr_extra roll__three">{this.props.rollScore[2] ? this.props.rollScore[2] : " "}</div>
            <div className="score__total">score</div>
          </div>
        </div>
      )
    }else{
      return (
        <div className="frame" id={"frame__"+this.props.frameNum}>
          <div className="frame__num">{this.props.frameNum}</div>
          <div className="frame__scores">
            <div className="roll tl_normal roll__one">{this.props.rollScore[0]}</div>
            <div className="roll tr_normal roll__two">{this.props.rollScore[1]}</div>
            <div className="score__total">score</div>
          </div>
        </div>
      )
    }
  }
}
export default Frame;