import React from 'react';
import "./MethodSearch.css"

function MethodEntree(props) {
    return (
        <tr key={props.item.methodId} onClick={() => props.onClick(props.item.methodId)}>
            <td>{props.item.title}</td>
            <td>{props.item.stage}</td>
            <td>{props.item.classification}</td>
        </tr>
    );
}

export default MethodEntree;
