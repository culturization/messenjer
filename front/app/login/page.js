"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'
import axios from 'axios';
import { SignInForm } from 'components/SignInForm.js'
 
function LoginForm(email, name, tag, password) {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    await axios.post('/api/login', formData, {
      headers: { 'Content-Type': 'application/json' }
    }).then((async res => {
      console.log(res.data.access_token)
      setCookie('token', `${res.data.token_type} ${res.data.access_token}`, { secure: true });
      setCookie('logged_in', true);
      setMessage('Вы вошли в свой аккаунт!');
      setIsError(false);
      await new Promise(r => setTimeout(r, 2000));
      router.push("/app")
    })).catch((e) => {
      setMessage(`Что-то пошло не так: ${e.response.data.error}`);
      setIsError(true);
    })
  }

  return (
    <>
      <SignInForm handleSubmit={handleSubmit} message={message} isError={isError}/>
      {message && <p>{message}</p>}
    </>
  )
};

export default function Page() {
  return (
    <LoginForm/>
  )
}