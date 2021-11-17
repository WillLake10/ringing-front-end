import React from "react";

function Bell(props)  {
    let y = props.rowPad + (props.rowNum * props.rowHeight)
    let x = props.columnPad + props.col + (props.bell.bellPos * props.columnWidth)
    let b = props.bell.bell
    if (props.bell.bellNum === 1) {
        return (
            <text x={x} y={y} fill={"red"} />
        )
    } else if (props.bell.bellNum === 2) {
        return (
            <text x={x} y={y} fill="blue" />
        )
    } else {
        return (
            <text x={x} y={y}>{b}</text>
        )
    }
}

export default Bell;
