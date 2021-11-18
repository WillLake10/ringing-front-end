import React from "react";

function Bell(props)  {
    let y = props.values.rowPad + (props.rowNum * props.values.rowHeight)
    let x = props.values.columnPad + props.col + (props.bell.bellPos * props.values.columnWidth)
    let b = props.bell.bell
    if (props.bell.bellNum === 1) {
        return (
            <text x={x} y={y} />
        )
    } else if (props.bell.bellNum === 2) {
        return (
            <text x={x} y={y} />
        )
    } else {
        return (
            <text x={x} y={y}>{b}</text>
        )
    }
}

export default Bell;
