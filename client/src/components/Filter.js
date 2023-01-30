import { React, useState } from 'react'
import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';


//check if it's valid year + number
//TODO so it shows the cubes
function Year(props) {
    var checkInt = parseInt(props);
    if (isNaN((checkInt))) {
        console.log("IS NOT A NUMBER")
    }
    //check for graduation year validity
    else if (1999 <= checkInt <= 2023) {
        console.log("good")
    }
    else {
        console.log("IS NOT A NUMBER")
    }
}


function Filter() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var noWhiteSpace = e.target.value.filter((e) => e !== "");
        setInputText(noWhiteSpace);
    };
    return (
        <div>
           
        </div>
    )
}
export default Filter
