import React from 'react';
import "./MethodSearch.css"

function MethodEntree(props) {
    return (
        <tr key={props.methodId} onClick={() => props.onClick(props.methodId)}>
            <td>{props.title}</td>
            <td>{props.stage}</td>
            <td>{props.classification}</td>
        </tr>
    );
}

export default MethodEntree;
