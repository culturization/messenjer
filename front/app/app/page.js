"use client";

import { NeedsAuth } from 'components/needsAuth.js'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

import { GroupListSidebar } from 'components/GroupListSidebar'
import { ChatWindow } from 'components/ChatWindow'
import { ChatFooter } from 'components/ChatFooter'

export default function Page() {
    const router = useRouter();
    const [groups, setGroups] = useState([]);
    const [messages, setMessages] = useState([]);
    const [didRequests, setDidRequests] = useState(false);

    const [currentUser, setCurrentUser] = useState({});
    const [currentGroup, setCurrentGroup] = useState(0);

    function handleMessageSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        setMessages([
            ...messages,
            {content: formData.get('content')}
        ]);
    }

    let headers = { Authorization: getCookie('token') };

    const { query } = router;

    useEffect(() => {
        async function fetchData() {
            setCurrentUser((await axios.get('/api/users/me', { headers })).data)

            const tempGroups = (await axios.get('/api/groups', { headers })).data;
            const tempCurrentGroup = query?.group || tempGroups[0]?.id;

            if (!tempCurrentGroup) {
                setGroups([{ name: 'АЦЦКАЯ КОНФА' }]);
                setDidRequests(true);
                return;
            }

            const tempMsgs = (await axios.get(`/api/groups/${tempCurrentGroup}/messages/latest`, { headers })).data;

            setGroups(tempGroups);
            setCurrentGroup(tempCurrentGroup);
            setMessages(tempMsgs);

            setDidRequests(true);
        };

        if (!didRequests) fetchData();
    }, []);

    if (!didRequests) return;

    return (
        <div className="min-h-screen bg-discord-gray">
            <NeedsAuth>
                <GroupListSidebar groups={groups} setGroups={setGroups} headers={headers}/>

                <div>
                    <ChatWindow messages={messages} currentUser={currentUser}/>

                    <ChatFooter handleMessageSubmit={handleMessageSubmit}/>
                </div>
            </NeedsAuth>
        </div>
    )
}