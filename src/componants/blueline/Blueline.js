import React from "react";
import Bell from "./Bell"
import TopLine from "./TopLine";
import Notation from "./Notation"
import BellStart from "./BellStart";

class Blueline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            width: 800,
            height: 182,
            rowHeight: 17,
            columnWidth: 10,
            rowPad: 20,
            columnPad: 60,
            col: 0,
            rowNum: 1,
            stage: this.props.method.stage
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

            const values = {
                stage: this.props.method.stage,
                rowHeight: 17,
                columnWidth: 10,
                rowPad: 20,
                columnPad: 60,
            }
            let j = 1
            let rowNum = 1
            let columnSpace = (values.stage * values.columnWidth) + 30
            let col = 0
            let k = 0
            let treble, blue = ""
            let lastT, lastT2 = ""
            let lastB, lastB2 = ""
            let leadendY = ""
            let leadendXBase = ""
            let lastRow = this.props.positions
                .plainCourse[this.props.positions.plainCourse.length - 1]
                .rows[this.props.method.lengthOfLead - 1]

            const leadsPerCol = () => {
                let colPerPageRem = this.state.width % columnSpace
                let colPerPage = (this.state.width - colPerPageRem) / columnSpace
                return Math.ceil(this.props.positions.plainCourse.length / colPerPage)
            }

            return (
                <svg width="100%" height={values.rowHeight * leadsPerCol() * (this.props.method.lengthOfLead + 3)}>
                    {this.props.positions.plainCourse.map(lead => {
                        if (k === leadsPerCol()) {
                            rowNum = 1
                            col = columnSpace * j
                            j++
                            k = 0
                            lastB2 = ""
                            lastT2 = ""
                        }
                        k++
                        lastRow.row.forEach(bell => {
                            if (bell.bellNum === 1) {
                                treble = lastT2 + getNextBluelinePos(values, col, rowNum, bell)
                            }
                            if (bell.bellNum === 2) {
                                blue = lastB2 + getNextBluelinePos(values, col, rowNum, bell)
                            }
                        })
                        return (
                            <>
                                <TopLine lastRow={lastRow} values={values} col={col} rowNum={rowNum}/>
                                <circle
                                    cx={values.columnPad + col + ((1.35 + values.stage) * values.columnWidth) - 3}
                                    cy={values.rowPad + ((rowNum + 0.95) * values.rowHeight) - (values.rowHeight * 1.3)}
                                    r={(values.rowHeight) / 2}
                                    stroke={"blue"}
                                    strokeWidth={"2"}
                                    fill={"none"}
                                />
                                <BellStart values={values} rowNum={rowNum} col={col} lastRow={lastRow}/>
                                {lead.rows.map(row => {
                                    lastRow = row
                                    rowNum++
                                    return (
                                        row.row.map(bell => {
                                            if (bell.bellNum === 1) {
                                                lastT2 = lastT
                                                lastT = getNextBluelinePos(values, col, rowNum, bell)
                                                treble = treble + lastT
                                            }
                                            if (bell.bellNum === 2) {
                                                lastB2 = lastB
                                                lastB = getNextBluelinePos(values, col, rowNum, bell)
                                                blue = blue + lastB
                                            }
                                            return (
                                                <Bell bell={bell} values={values} col={col} rowNum={rowNum}/>
                                            )
                                        })
                                    )
                                })}
                                {/*Leadend Line*/}
                                {leadendY = (values.rowPad + (rowNum * values.rowHeight) - values.rowHeight + 3)}
                                {leadendXBase = values.columnPad + col}
                                <polyline
                                    points={
                                        leadendXBase + ", " + leadendY + " "
                                        + (leadendXBase + (values.stage * values.columnWidth)) + ", " + leadendY
                                    }
                                    stroke={"black"}
                                    strokeWidth={"2"}
                                />
                                {/*Treble Line*/}
                                <polyline points={treble} stroke={"Red"} strokeWidth={"2"} fill={"none"}/>
                                {/*2nd Line*/}
                                <polyline points={blue} stroke={"Blue"} strokeWidth={"4"} fill={"none"}/>
                            </>
                        )
                    })}
                    <Notation values={values} method={this.props.method}/>
                </svg>
            )
        }
    }
}

function getNextBluelinePos(values, col, rowNum, bell) {
    return (
        (values.columnPad + col + (bell.bellPos * values.columnWidth) + values.columnWidth / 2)
        + ", "
        + (values.rowPad + (rowNum * values.rowHeight) - values.rowHeight / 3)
        + " "
    )
}


export default Blueline;
