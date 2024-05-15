"use client";

import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import axios from "axios";
import scrollToBottom from "lib/scrollToBottom";

export function GroupListSidebar({
  headers,
  groups,
  currentGroup,
  setGroups,
  setCurrentGroup,
  setMessages,
  chatBottomRef
}) {
  groups ||= [];

  const createNewGroup = async () => {
    await axios
      .post("/api/groups", { name: "АЦЦЦЦКАЯ КОНФА" }, { headers })
      .then(async (res) => {
        setGroups([...groups, res.data]);
      })
      .catch((e) => {
        console.log("Не получилось создать группу");
      });
  }

  const handleGroupIconClick = async (group_id) => {
    setCurrentGroup(group_id);
    await axios
      .get(`/api/groups/${group_id}/messages/latest`, { headers })
      .then((res) => {
        setMessages(res.data);
      });
  }

  return (
    <div className="block top-0 left-0 w-1/12 h-5/6 bg-discord-dark-gray fixed overflow-auto hide-scrollbar">
      {groups.map((d) => (
        <div
          className={`flex ${
            currentGroup == d.id
              ? "bg-discord-black"
              : "bg-discord-gray hover:bg-discord-dark-gray"
          } text-white my-4 w-20 h-20 ml-auto mr-auto border border-white border-2 rounded-full items-center justify-center`}
          onClick={() => handleGroupIconClick(d.id)}
        >
          <BsFillPeopleFill className="resize w-12 h-12" />
        </div>
      ))}
      <BsFillPlusCircleFill
        className="text-white resize w-12 h-12 mb-8 ml-auto mr-auto"
        onClick={createNewGroup}
      />
    </div>
  );
}
