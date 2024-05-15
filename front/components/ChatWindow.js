"use client";

import { AiFillAliwangwang } from "react-icons/ai";
import { useEffect, useState, useRef } from "react";
import scrollToBottom from "lib/scrollToBottom";

export function ChatWindow({ messages, currentUser, currentGroup }) {
  messages ||= [];

  const chatBottomRef = useRef(null);
  const [groupChanged, setGroupChanged] = useState(false);

  useEffect(() => {
    scrollToBottom(chatBottomRef);
  }, []);

  useEffect(() => {
    if (groupChanged) {
      setGroupChanged(false);
      scrollToBottom(chatBottomRef);
      return;
    }

    if ([...messages].pop()?.user_id == currentUser.id)
      scrollToBottom(chatBottomRef);
  }, [messages]);

  useEffect(() => {
    setGroupChanged(true);
  }, [currentGroup]);

  return (
    <div
      className="block absolute w-11/12 h-5/6 scroll-smooth left-[8.2%] bg-discord-gray overflow-auto"
    >
      {messages.map((msg) => (
        <div className="flex items-start space-x-4 p-4 border-b">
          <AiFillAliwangwang className="w-16 h-16" />
          <div>
            <p class="font-semibold text-md text-white">{currentUser.name}</p>
            <p class="text-white">{msg.content}</p>
          </div>
        </div>
      ))}
      <div id="chatBottom" ref={chatBottomRef} />
    </div>
  );
}
