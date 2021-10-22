import React from 'react';
import MethodEntree from "../componants/methodSearch/MethodEntree";
import "../componants/methodSearch/MethodSearch.css"

class Methods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            methodId: "none"
        };
    }

    componentDidMount() {
        fetch("/methods/all")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.methods
                            .sort(
                                function (a, b) {
                                    if (a.title.substring(0, a.title.lastIndexOf(" ")) === b.title.substring(0, b.title.lastIndexOf(" "))) {
                                        return a.stage - b.stage;
                                    }
                                    return a.title > b.title ? 1 : -1;
                                }
                            )
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    openMethod(id) {
        this.setState({
            methodId: id
        })
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(items)
            return (
                <div>
                    <h1>{this.state.methodId}</h1>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Bells</th>
                            <th>Classification</th>
                        </tr>
                        {items.map(item => (
                            <MethodEntree
                                methodId={item.methodId}
                                title={item.title}
                                stage={item.stage}
                                classification={item.classification}
                                onClick={id => this.openMethod(id)}
                            />
                        ))}
                    </table>
                </div>
            );
        }
    }
}

export default Methods;
