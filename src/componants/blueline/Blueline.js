import React from "react";
import Bell from "./Bell"
import TopLine from "./TopLine";

class Blueline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            width: 800,
            height: 182
        };
    }

    updateDimensions() {
        if (window.innerWidth < 500) {
            this.setState({width: 450, height: 102});
        } else {
            let update_width = window.innerWidth - 100;
            let update_height = Math.round(update_width / 4.4);
            this.setState({width: update_width, height: update_height});
        }
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            const stage = this.props.method.stage
            const rowHeight = 17
            const columnWidth = 10
            const rowPad = 20
            const columnPad = 20
            let j = 1
            let rowNum = 1
            let columnSpace = (stage * columnWidth) + 20
            let col = 0
            let k = 0
            let treble = ""
            let blue = ""
            let lastRow = this.props.positions.plainCourse[this.props.positions.plainCourse.length-1].rows[this.props.method.lengthOfLead-1]
            console.log(lastRow)
            const leadsPerCol = () => {
                let colPerPageRem = this.state.width % columnSpace
                let colPerPage = (this.state.width - colPerPageRem) / columnSpace
                let out = Math.ceil(this.props.positions.plainCourse.length / colPerPage)
                console.log("w: " + this.state.width)
                console.log(columnSpace)
                console.log(colPerPageRem)
                console.log(colPerPage)
                console.log(out)
                return out
            }
            return (
                <svg width="100%" height={rowHeight * leadsPerCol() * (this.props.method.lengthOfLead+2) }>
                    {this.props.positions.plainCourse.map(
                        lead => {
                            if (k === leadsPerCol()) {
                                rowNum = 1
                                col = columnSpace * j
                                j++
                                k = 0
                            }
                            k++
                            lastRow.row.map(
                                bell => {
                                    if (bell.bellNum === 1) {
                                        treble = (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                    }
                                    if (bell.bellNum === 2) {
                                        blue = (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                    }
                                    return null
                                }
                            )
                            return (
                                <>
                                    <TopLine
                                        x1={columnPad + col}
                                        y1={rowPad + ((rowNum+1) * rowHeight) - rowHeight + 3}
                                        x2={columnPad + col + (stage * columnWidth)}
                                        y2={rowPad + ((rowNum+1) * rowHeight) - rowHeight + 3}
                                        rowNum={rowNum}
                                        lastRow={lastRow}
                                        rowPad={rowPad}
                                        rowHeight={rowHeight}
                                        columnPad={columnPad}
                                        col={col}
                                        columnWidth={columnWidth}
                                    />
                                    {lead.rows.map(
                                        row => {
                                            lastRow = row
                                            rowNum++
                                            return (
                                                row.row.map(
                                                    bell => {
                                                        if (bell.bellNum === 1) {
                                                            treble = treble + (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                                        }
                                                        if (bell.bellNum === 2) {
                                                            blue = blue + (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                                        }
                                                        return (
                                                            <Bell
                                                                bell={bell}
                                                                rowPad={rowPad}
                                                                rowNum={rowNum}
                                                                rowHeight={rowHeight}
                                                                columnPad={columnPad}
                                                                col={col}
                                                                columnWidth={columnWidth}
                                                            />
                                                        )
                                                    }
                                                )
                                            )
                                        }
                                    )}
                                    <polyline
                                        points={(columnPad + col) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight + 3) + " " + (columnPad + col + (stage * columnWidth)) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight + 3)}
                                        stroke={"black"}
                                        strokeWidth={"2"}
                                    />
                                    <polyline
                                        points={treble}
                                        stroke={"Red"}
                                        strokeWidth={"2"}
                                        fill={"none"}
                                    />
                                    <polyline
                                        points={blue}
                                        stroke={"Blue"}
                                        strokeWidth={"2"}
                                        fill={"none"}
                                    />
                                </>
                            )
                        }
                    )}
                </svg>
            )
        }
    }
}

export default Blueline;

// <>
// <Row
//     bell={bell}
//     rowPad={rowPad}
//     rowNum={rowNum}
//     rowHeight={rowHeight}
//     columnPad={columnPad}
//     col={col}
//     columnWidth={columnWidth}
// />
// </>