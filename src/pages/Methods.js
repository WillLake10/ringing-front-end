import React from 'react';
import MethodEntree from "../componants/methodSearch/MethodEntree";
import "../componants/methodSearch/MethodSearch.css"

class Methods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
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

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log(items)
            return (
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
                            />
                        ))}
                </table>
            );
        }
    }
}

export default Methods;
