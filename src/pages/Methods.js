import React from 'react';
import MethodEntree from "../componants/methodSearch/MethodEntree";
import "../componants/methodSearch/MethodSearch.css"
import MethodSearch from "../componants/methodSearch/MethodSearch";

class Methods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            methodId: "none",
            methodFiltered: [],
            query: "",
            initialLoad: false
        };
    }

    componentDidMount() {
        fetch("/methods/all")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
        this.setState({
            methodFiltered: this.state.items
        })
    }

    openMethod(id) {
        this.setState({
            methodId: id
        })
    }

    queryChange(query) {
        console.log(query)
        this.setState({
            query: query,
            methodFiltered: this.state.items.filter(v => v.title.toLowerCase().includes(query))
        })
        console.log(this.state.query)
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (this.state.initialLoad === false && this.state.methodFiltered.length === 0) {
                this.setState({
                    methodFiltered: this.state.items,
                    initialLoad: true
                })
            }
            console.log(items)
            return (
                <div>
                    <MethodSearch
                        onChange={query => this.queryChange(query)}
                    />
                    {/*<h1>{this.state.methodId}</h1>*/}
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Bells</th>
                            <th>Classification</th>
                        </tr>
                        {this.state.methodFiltered.map(item => (
                            <MethodEntree
                                item={item}
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
