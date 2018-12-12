import React from 'react';

class Frame extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <h5>{this.props.frameNum}</h5>
        <div>
          <div>tl</div>
          <div>tr</div>
          <div>score</div>
        </div>
      </div>
    )
  }
}
export default Frame;