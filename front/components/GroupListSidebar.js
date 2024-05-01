"use client";

import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";

export function GroupListSidebar({
  headers,
  groups,
  setGroups,
  setCurrentGroup,
  setMessages,
}) {
  groups ||= [];

  async function createNewGroup() {
    await axios
      .post("/api/groups", { name: "АЦЦЦЦКАЯ КОНФА" }, { headers })
      .then(async (res) => {
        setGroups([...groups, { name: "АЦЦЦЦКАЯ КОНФА", id: res.data.id }]);
      })
      .catch((e) => {
        console.log("Не получилось создать группу");
      });
  }

  function handleGroupIconClick(group_id) {
    console.log("iconclick");
    setCurrentGroup(group_id);
    axios
      .get(`/api/groups/${group_id}/messages/latest`, { headers })
      .then((res) => {
        setMessages(res.data);
      });
  }

  return (
    <div className="block top-0 left-0 w-1/12 h-5/6 bg-discord-dark-gray fixed overflow-auto">
      {groups.map((d) => (
        <a className="text-white" onClick={() => handleGroupIconClick(d.id)}>
          <BsFillPeopleFill className="resize w-12 h-12 my-8 ml-auto mr-auto" />
        </a>
      ))}
      <a onClick={createNewGroup}>
        <BsFillPlusCircleFill className="resize w-12 h-12 mb-8 ml-auto mr-auto" />
      </a>
    </div>
  );
}
