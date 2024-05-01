"use client";

import React from 'react';

export function SignInForm({ handleSubmit, message, isError }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Email:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="email"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Пароль:</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password"/>
                </div>
                <button type="submit">Отправить</button>
                {message && <p className={`text-md align-center mt-7 ${isError ? 'text-red-500' : 'text-black'} font-bold`}>{message}</p>}
            </form>
        </div>
    )
}