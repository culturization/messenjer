"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { GroupListSidebar } from "components/GroupListSidebar";
import { ChatWindow } from "components/ChatWindow";
import { ChatFooter } from "components/ChatFooter";

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

  console.log(isAuthorized);

  useEffect(() => {
    if (!isAuthorized) return;
    fetchData();
  }, []);

  if (!isAuthorized) router.push("/login");

  return (
    <div>
      <GroupListSidebar
        headers={headers}
        groups={groups}
        setGroups={setGroups}
        setCurrentGroup={setCurrentGroup}
        setMessages={setMessages}
      />

      <div>
        <ChatWindow messages={messages} currentUser={currentUser} />

        <ChatFooter
          headers={headers}
          group_id={currentGroup}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
