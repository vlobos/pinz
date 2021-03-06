import React from "react";

class Pins extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let pinNums = this.props.pinsAvailable;
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