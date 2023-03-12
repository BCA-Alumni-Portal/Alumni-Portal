import { React, useState } from 'react'
import { Toast } from 'flowbite-react/lib/cjs/components/Toast';

function FilterToast(props) {
    for (let i = 0; i < props.length; i++) {
        let display_text = props[i];
        if (display_text != "") {
            return ([
                < Toast >
                    <div className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-lg bg-amber-300">
                    </div>
                    <div className="ml-3 text-black text-xs">
                        <p>{display_text} </p>
                    </div>
                    <Toast.Toggle />
                </Toast >
            ])
        }
    }
}

export default FilterToast;