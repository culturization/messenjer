"use client";

import React from "react";
import { AiFillAliwangwang } from "react-icons/ai";

export function ChatWindow({ messages, currentUser }) {
  messages ||= [];

  return (
    <>
        <div className="block absolute w-11/12 h-5/6 scroll-smooth left-[8.2%] bg-discord-gray overflow-auto">
          {messages.map((msg) => (
            <div className="flex items-start space-x-4 p-4 border-b bg-discord-gray">
              <AiFillAliwangwang className="w-16 h-16" />
              <div>
                <p class="font-semibold text-md text-white">
                  {currentUser.name}
                </p>
                <p class="text-white">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
    </>
  );
}
