import React from 'react';
import Blueline from "../componants/blueline/Blueline"

class Method extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            plainIsLoaded: false,
            methodIsLoaded: false,
            methodId: this.props.location.pathname.replace("/method/", "")
        }
    }

    componentDidMount() {
        fetch("/methods/" + this.state.methodId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        methodIsLoaded: true,
                        method:result
                    })
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        fetch("/methods/" + this.state.methodId + "/plain")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        plainIsLoaded: true,
                        methodPlain:result
                    })
                    console.log(result)
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
        const {error, methodIsLoaded, plainIsLoaded, method} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!methodIsLoaded || !plainIsLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {/*<h3>Method {this.state.methodId}</h3>*/}
                    <h2>
                        {method.title}
                    </h2>
                    <Blueline positions={this.state.methodPlain} method={this.state.method} />
                </div>
            );
        }
    }
}

export default Method;
