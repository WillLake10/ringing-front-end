import React from "react";

function BellStart(props) {
    return (
        <>
            <circle
                cx={props.values.columnPad + props.col + ((1.35 + props.values.stage) * props.values.columnWidth) - 3}
                cy={props.values.rowPad + ((props.rowNum + 0.95) * props.values.rowHeight) - (props.values.rowHeight * 1.3)}
                r={(props.values.rowHeight) / 2}
                stroke={"blue"}
                strokeWidth={"2"}
                fill={"none"}
            />
            <text
                x={props.values.columnPad + props.col + ((1 + props.values.stage) * props.values.columnWidth) - 3}
                y={props.values.rowPad + (props.rowNum * props.values.rowHeight) - ((props.values.rowHeight) / 10)}
                fontSize={(2 * props.values.rowHeight) / 3}
            >
                {
                    props.lastRow.row.map(
                        bell => {
                            if (bell.bellNum === 2) {
                                if (bell.bellPos < 9) {
                                    return bell.bellPos + 1
                                } else if (bell.bellPos === 9) {
                                    return "0"
                                } else if (bell.bellPos === 10) {
                                    return "E"
                                } else if (bell.bellPos === 11) {
                                    return "T"
                                } else if (bell.bellPos === 12) {
                                    return "A"
                                } else if (bell.bellPos === 13) {
                                    return "B"
                                } else if (bell.bellPos === 14) {
                                    return "C"
                                } else if (bell.bellPos === 15) {
                                    return "D"
                                }
                            }
                            return null
                        }
                    )}
            </text>
        </>
    )
}

export default BellStart
