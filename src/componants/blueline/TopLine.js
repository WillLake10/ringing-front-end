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
                                values={props.values}
                                rowNum={1}
                                col={props.col}
                            />
                        )
                    }
                )}
            </>
        )
    }
    return null
}

export default TopLine
