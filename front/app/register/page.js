"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { RegisterForm } from 'components/RegisterForm';
 
function RegistrationForm(email, name, tag, password) {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    await axios.post('/api/register', formData, {
      headers: { 'Content-Type': 'application/json' }
    }).then((async res => {
      setMessage('Вы успешно зарегистрировались!');
      setIsError(false);
      await new Promise(r => setTimeout(r, 2000));
      router.push("/")
    })).catch((e) => {
      setMessage(`Что-то пошло не так: ${e.response.data.error}`);
      setIsError(true);
    })
  }

  return (
    <RegisterForm handleSubmit={handleSubmit} message={message} isError={isError}/>
  )
};

export default function Page() {
  return (
    <RegistrationForm/>
  )
}