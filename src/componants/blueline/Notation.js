import React from "react";

function Notation(props) {
    let changeRow = 0
    return(
        <>
            {props.method.notation.split(".").map(
                change => {
                    changeRow++
                    let y = props.rowPad + (changeRow * props.rowHeight) + ((props.rowHeight)/3)
                    let x = props.columnPad - (props.columnWidth/2)
                    return (
                        <text x={x} y={y} textAnchor={"end"} fontSize={(2 * props.rowHeight) / 3} fill={"#999999"}>{change}</text>
                    )
                }
            )}
        </>
    )
}

export default Notation