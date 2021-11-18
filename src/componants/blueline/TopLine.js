import React from "react";
import Bell from "./Bell";

function TopLine(props) {
    if (props.rowNum === 1) {
        return (
            <>
                {props.lastRow.row.map(
                    bell => {
                        return (
                            <Bell
                                bell={bell}
                                rowPad={props.rowPad}
                                rowNum={1}
                                rowHeight={props.rowHeight}
                                columnPad={props.columnPad}
                                col={props.col}
                                columnWidth={props.columnWidth}
                            />
                        )
                    }
                )}
                {/*<polyline*/}
                {/*    points={props.x1 + ", " + props.y + " " + props.x2 + ", " + props.y}*/}
                {/*    stroke={"black"}*/}
                {/*    strokeWidth={"2"}*/}
                {/*/>*/}
            </>
        )
    }
    return null
}

export default TopLine
