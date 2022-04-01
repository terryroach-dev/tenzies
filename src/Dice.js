import React from "react";

function Dice(props) {
    const diceFaceStyle = {
        backgroundColor: props.isHeld ? "green" : "black"
    }
    return(
        <div className="dice-div" style={diceFaceStyle} onClick={props.holdDice}>
            {props.value}
        </div>
    )
}

export default Dice;