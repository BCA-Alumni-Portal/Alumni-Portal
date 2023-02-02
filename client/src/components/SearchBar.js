import { React, useState } from 'react'
import data from "./ListData.json"


function SearchBar(props) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        // <ul className="block border-black border">
        // <li className="text-black  block  hover:bg-hover-cream py-3 text-sm" key={item.id}>{item.text}</li>

        <div class="list-group">

        {filteredData.map((item) => (
            <li class="list-group-item list-group-item-action" key={item.id}>{item.text}</li>
            ))}
        </div>
            
        //</ul>
    )
}


export default SearchBar
