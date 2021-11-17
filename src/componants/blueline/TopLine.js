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
                <polyline
                    points={props.x1 + ", " + props.y1 + " " + props.x2 + ", " + props.y2}
                    stroke={"black"}
                    strokeWidth={"2"}
                />
            </>
        )
    }
    return null
}

export default TopLine

// x1={columnPad + col}
// y1={rowPad + ((rowNum+1) * rowHeight) - rowHeight + 3}
// x2={columnPad + col + (stage * columnWidth)}
// y2={rowPad + ((rowNum+1) * rowHeight) - rowHeight + 3}
// rowNum={rowNum}
// lastRow={lastRow}
// rowPad={rowPad}
// rowHeight={rowHeight}
// columnPad={columnPad}
// col={col}
// columnWidth={columnWidth}