import React from "react";
import "./MethodSearch.css"

function MethodSearch(props) {
    return (
        <div className="input_class">
            <form id="searchInput">
                <input
                    type="text"
                    placeholder="Search Methods"
                    onChange={() => props.onChange(getVal())}
                />
            </form>
        </div>
    )
}

function getVal() {
    return document.querySelector('input').value.toLowerCase();
}

export default MethodSearch;