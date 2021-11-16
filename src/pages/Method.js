import React from 'react';

class Method extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            methodId: this.props.location.pathname.replace("/method/", "")
        }
    }

    componentDidMount() {
        fetch("/methods/" + this.state.methodId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
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
    }

    render() {
        const {error, isLoaded, method} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h3>Method {this.state.methodId}</h3>
                    <p>
                        {method.title}
                    </p>
                </div>
            );
        }
    }
}

export default Method;
