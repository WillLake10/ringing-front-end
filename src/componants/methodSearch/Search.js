import React from "react";

function Search(props) {
    return (
        <form id="searchInput">
            <input
                type="text"
                placeholder="Search Methods"
                onChange={() => props.onChange(getVal())}
            />
        </form>
    )
}

function getVal() {
    return document.querySelector('input').value.toLowerCase();
}

export default Search;