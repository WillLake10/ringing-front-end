import React from "react";
import Bell from "./Bell"
import TopLine from "./TopLine";
import Notation from "./Notation"

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
            const columnPad = 60
            let j = 1
            let rowNum = 1
            let columnSpace = (stage * columnWidth) + 30
            let col = 0
            let k = 0
            let treble = ""
            let blue = ""
            let lastT = ""
            let lastB = ""
            let lastT2 = ""
            let lastB2 = ""
            let lastRow = this.props.positions.plainCourse[this.props.positions.plainCourse.length - 1].rows[this.props.method.lengthOfLead - 1]
            const leadsPerCol = () => {
                let colPerPageRem = this.state.width % columnSpace
                let colPerPage = (this.state.width - colPerPageRem) / columnSpace
                return Math.ceil(this.props.positions.plainCourse.length / colPerPage)
            }
            return (
                <svg width="100%" height={rowHeight * leadsPerCol() * (this.props.method.lengthOfLead + 3)}>
                    {this.props.positions.plainCourse.map(
                        lead => {
                            if (k === leadsPerCol()) {
                                rowNum = 1
                                col = columnSpace * j
                                j++
                                k = 0
                                lastB2 = ""
                                lastT2 = ""
                            }
                            k++
                            lastRow.row.map(
                                bell => {
                                    if (bell.bellNum === 1) {
                                        treble = lastT2 + (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                    }
                                    if (bell.bellNum === 2) {
                                        blue = lastB2 + (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                    }
                                    return null
                                }
                            )
                            return (
                                <>
                                    <TopLine
                                        x1={columnPad + col}
                                        x2={columnPad + col + (stage * columnWidth)}
                                        y={rowPad + ((rowNum + 1) * rowHeight) - rowHeight + 3}
                                        rowNum={rowNum}
                                        lastRow={lastRow}
                                        rowPad={rowPad}
                                        rowHeight={rowHeight}
                                        columnPad={columnPad}
                                        col={col}
                                        columnWidth={columnWidth}
                                    />
                                    <circle
                                        cx={columnPad + col + ((1.35 + stage) * columnWidth) - 3}
                                        cy={rowPad + ((rowNum + 0.95) * rowHeight) - (rowHeight * 1.3)}
                                        r={(rowHeight) / 2}
                                        stroke={"blue"}
                                        strokeWidth={"2"}
                                        fill={"none"}
                                    />
                                    <text
                                        x={columnPad + col + ((1 + stage) * columnWidth) - 3}
                                        y={rowPad + (rowNum * rowHeight) - ((rowHeight) / 10)}
                                        fontSize={(2 * rowHeight) / 3}
                                    >
                                        {
                                            lastRow.row.map(
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
                                    {lead.rows.map(
                                        row => {
                                            lastRow = row
                                            rowNum++
                                            return (
                                                row.row.map(
                                                    bell => {
                                                        if (bell.bellNum === 1) {
                                                            lastT2 = lastT
                                                            lastT = (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                                            treble = treble + lastT
                                                        }
                                                        if (bell.bellNum === 2) {
                                                            lastB2 = lastB
                                                            lastB = (columnPad + col + (bell.bellPos * columnWidth) + columnWidth / 2) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight / 3) + " "
                                                            blue = blue + lastB
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
                                    {/*Leadend Line*/}
                                    <polyline
                                        points={(columnPad + col) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight + 3) + " " + (columnPad + col + (stage * columnWidth)) + ", " + (rowPad + (rowNum * rowHeight) - rowHeight + 3)}
                                        stroke={"black"}
                                        strokeWidth={"2"}
                                    />
                                    {/*Treble Line*/}
                                    <polyline
                                        points={treble}
                                        stroke={"Red"}
                                        strokeWidth={"2"}
                                        fill={"none"}
                                    />
                                    {/*2nd Line*/}
                                    <polyline
                                        points={blue}
                                        stroke={"Blue"}
                                        strokeWidth={"4"}
                                        fill={"none"}
                                    />
                                </>
                            )
                        }
                    )}
                    <Notation
                        rowPad={rowPad}
                        rowHeight={rowHeight}
                        columnPad={columnPad}
                        columnWidth={columnWidth}
                        method={this.props.method}
                    />
                </svg>
            )
        }
    }
}

export default Blueline;
