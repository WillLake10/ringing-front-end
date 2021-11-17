import React from "react";

class Blueline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const length = () => {
                let i = 0
                this.props.positions.plainCourse.map(lead => (
                        lead.rows.map(row => (
                                i++
                            )
                        )
                    )
                )
                return i
            }
            const stage = this.props.method.stage
            const rowHeight = 17
            const columnWidth = 10
            const rowPad = 20
            const columnPad = 20
            const leadsPerCol = () => {
                if (stage <= 8) {
                    return 1
                } else {
                    return 2
                }
            }
            let j = 1
            console.log(length())
            let rowNum = 0
            let columnSpace = (stage * columnWidth) + 20
            let col = 0
            let k = 0
            return (
                <svg width="75%" height={(rowHeight + 1) * length()}>
                    {this.props.positions.plainCourse.map(
                        lead => {
                            if (k === leadsPerCol()){
                                rowNum = 0
                                col = columnSpace * j
                                j++
                                k = 0
                            }
                            k++
                            return (
                                lead.rows.map(
                                    row => {
                                        rowNum++
                                        return (
                                            row.row.map(
                                                bell => {
                                                    let y = rowPad + (rowNum * rowHeight)
                                                    let x = columnPad + col + (bell.bellPos * columnWidth)
                                                    let b = bell.bell
                                                    console.log(x + ", " + y + ": " + b)
                                                    if (bell.bellNum === 1) {
                                                        return (
                                                            <text x={x} y={y} fill={"red"}>{b}</text>
                                                        )
                                                    } else if (bell.bellNum === 2) {
                                                        return (
                                                            <text x={x} y={y} fill="blue">{b}</text>
                                                        )
                                                    } else {
                                                        return (
                                                            <text x={x} y={y}>{b}</text>
                                                        )
                                                    }
                                                }
                                            )
                                        )
                                    }
                                )
                            )
                        }
                    )}
                </svg>
            )
        }
    }
}

export default Blueline;