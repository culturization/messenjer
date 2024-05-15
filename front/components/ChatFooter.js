"use client";

import axios from "axios";
import scrollToBottom from "lib/scrollToBottom";

export function ChatFooter({ headers, group_id, messages, setMessages, chatBottomRef }) {
  async function handleMessageSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    await axios
      .post(`/api/groups/${group_id}/messages`, formData, { headers })
      .then(async (res) => {
        setMessages([...messages, res.data]);
      })
      .catch((e) => {
        console.log(`Не получилось отправить сообщение: ${e.message}`);
      });
  }

  return (
    <div className="block fixed bottom-0 h-1/6 ml-1/4 pt-16 w-full flex border-b items-center space-x-4 p-4 border-t bg-discord-black">
      <form className="left-0 ml-8 mb-8" onSubmit={handleMessageSubmit}>
        <input
          className="flex-1 appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
          type="text"
          placeholder="Ваше сообщение..."
          name="content"
        />

        <button
          className="flex-shrink-0 inline-flex px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:discord-light-gray"
          type="submit"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
