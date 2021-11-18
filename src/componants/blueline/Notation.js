import React from "react";

function Notation(props) {
    let changeRow = 0
    return(
        <>
            {props.method.notation.split(".").map(
                change => {
                    changeRow++
                    let y = props.values.rowPad + (changeRow * props.values.rowHeight) + ((props.values.rowHeight)/3)
                    let x = props.values.columnPad - (props.values.columnWidth/2)
                    return (
                        <text x={x} y={y} textAnchor={"end"} fontSize={(2 * props.values.rowHeight) / 3} fill={"#999999"}>{change}</text>
                    )
                }
            )}
        </>
    )
}

export default Notation