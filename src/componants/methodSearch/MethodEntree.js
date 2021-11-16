import React from 'react';
import "./MethodEntree.css"
import {useHistory} from "react-router-dom";

function MethodEntree(props) {
    const history = useHistory();

    return (
        <tr key={props.item.methodId} onClick={() => history.push("/method/" + props.item.methodId)}>
        {/*<tr key={props.item.methodId} onClick={() => props.onClick(props.item.methodId)}>*/}
            <td>{props.item.title}</td>
            <td>{props.item.stage}</td>
            <td>{props.item.classification}</td>
        </tr>
    );
}

export default MethodEntree;
