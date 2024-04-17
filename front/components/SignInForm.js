"use client";

import React from 'react';

export function SignInForm({ handleSubmit, message, isError }) {
    return (
        <div class="flex min-h-screen items-center justify-center">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" htmlFor="username">Email:</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="email"/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2" htmlFor="password">Пароль:</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password"/>
                </div>
                <button type="submit">Отправить</button>
                {message && <p class={`text-md align-center mt-7 ${isError ? 'text-red-500' : 'text-black'} font-bold`}>{message}</p>}
            </form>
        </div>
    )
}