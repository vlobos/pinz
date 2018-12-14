import React from "react";

class Pins extends React.Component{
  constructor(props){
    super(props)
  }
  render(){

    let pinNums = [0,1,2,3,4,5,6,7,8,9,10]
    return (
      <section id="pins__container">
        <div>Knock em down!</div>
        <div id="pins__options">
          {pinNums.map((pin, index)=>{
            return(
              <button id={"btn__"+pin} className="pins__btn" key={index} onClick={this.props.handlePinSelection}>{pin}</button>
            )
          })}
        </div>
      </section>
    )
  }
}

export default Pins;