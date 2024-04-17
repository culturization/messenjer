"use client";

import React from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from 'axios';

export function GroupListSidebar({ groups, setGroups, headers }) {
    groups ||= [];

    console.log(groups)

    async function createNewGroup() {
        await axios.post('/api/groups', { name: 'АЦЦЦЦКАЯ КОНФА' }, { headers }).then((async res => {
            setGroups([...groups, { name: 'АЦЦЦЦКАЯ КОНФА' }])
            console.log('Получилось создать группу')
        })).catch((e) => {
            console.log('Не получилось создать группу')
        })
    }

    return (
        <div className="m-0 p-0 w-1/8 bg-discord-dark-gray fixed h-full overflow-auto">
            <div className="block p-8 m-4 bg-discord-gray rounded-full border">
                {groups.map((d) => (
                    <a className="text-white" href={`/app?group=${d.id}`}>
                        <BsFillPeopleFill className="resize w-12 h-12 my-8"/>
                    </a>
                ))}
                <button id="close-image" onClick={createNewGroup} ><BsFillPlusCircleFill className="resize w-12 h-12"/></button>
            </div>
        </div>
    );
};