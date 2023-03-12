import { React, useState } from 'react'
import { Toast } from 'flowbite-react/lib/cjs/components/Toast';

function FilterToast(props) {
    // console.log(props.input)
    return(
    <div class="list-group">
        {props.input.map((result) => {
            return(
            < Toast >
                <div className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-lg bg-amber-300">
                </div>
                <div className="ml-3 text-black text-xs">
                    <p>{result} </p>
                </div>
                <Toast.Toggle />
            </Toast >)
        })}
    </div>)
}

export default FilterToast;