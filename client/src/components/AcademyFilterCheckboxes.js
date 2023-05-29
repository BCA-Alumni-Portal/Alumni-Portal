import * as React from 'react';
import { Transition } from '@headlessui/react'
import { useState } from 'react'

function AcademyFilter(props) {
    let academies = props.academies;
    let entriesPerRow = props.entriesPerRow;
    let filterFunction = props.filterFunctionGenerator;

    let academyLists = [];
    let lists = Math.ceil(academies.length / entriesPerRow);

    for (let i = 0; i < lists; i++) {
        let newList = [];
        for (let index = 0; index < entriesPerRow; index++) {
            let academyIndex = i * entriesPerRow + index;
            if (academies[academyIndex] == undefined) {
                break;
            }
            newList.push(academies[academyIndex]);
        }
        academyLists.push(newList);
    }

    return (
        academyLists.map((academyList) => {
            return (
                <label className="label cursor-pointer">
                    {academyList.map((academy) => {
                        return (
                            <div>
                                <span className="text-sm">{academy}</span>
                                <input type="checkbox" defaultChecked={true} className="checkbox checkbox-info checkbox-sm" onClick={
                                    () => filterFunction(academy)
                                } />
                            </div>
                        )
                    })}
                </label>
            )
        })
    )
}

export default AcademyFilter;