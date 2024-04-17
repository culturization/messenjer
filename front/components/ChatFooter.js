"use client";

import React from 'react';

export function ChatFooter({ handleMessageSubmit }) {
    return (
        <div className="fixed bottom-0 ml-1/4 pt-16 w-full flex justify-center border-b items-center space-x-4 p-4 border-t bg-discord-black">
            <form onSubmit={handleMessageSubmit}>
                <input className="flex-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" placeholder="Ваше сообщение..." name="content" />

                <button className="flex-shrink-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:discord-light-gray" type="submit">Отправить</button>
            </form>
        </div>
    );
}