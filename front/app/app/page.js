"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { GroupListSidebar } from "components/GroupListSidebar";
import { ChatWindow } from "components/ChatWindow";
import { ChatFooter } from "components/ChatFooter";

import scrollToBottom from "lib/scrollToBottom";

export default function Page() {
  async function fetchData() {
    setCurrentUser((await axios.get("/api/users/me", { headers })).data);

    const tempGroups = (await axios.get("/api/groups", { headers })).data;
    const tempCurrentGroup = tempGroups[0]?.id;

    if (!tempCurrentGroup) {
      setGroups([{ name: "АЦЦКАЯ КОНФА" }]);
      return;
    }

    const tempMsgs = (
      await axios.get(`/api/groups/${tempCurrentGroup}/messages/latest`, {
        headers,
      })
    ).data;

    setGroups(tempGroups);
    setCurrentGroup(tempCurrentGroup);
    setMessages(tempMsgs);
  }

  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [currentGroup, setCurrentGroup] = useState(0);

  let isAuthorized = getCookie("logged_in");
  let headers = { Authorization: getCookie("token") };

  useEffect(() => {
    if (!isAuthorized) return;
    fetchData();
  }, []);

  if (!isAuthorized) router.push("/login");

  return (
    <div className="flex">
      <GroupListSidebar
        headers={headers}
        groups={groups}
        currentGroup={currentGroup}
        setGroups={setGroups}
        setCurrentGroup={setCurrentGroup}
        setMessages={setMessages}
      />

      <ChatWindow
        messages={messages}
        currentUser={currentUser}
        currentGroup={currentGroup}
      />

      <ChatFooter
        headers={headers}
        group_id={currentGroup}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
