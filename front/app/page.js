"use client";

import { NavBar } from 'components/Navbar.js';
import { getCookie } from 'cookies-next';

export default function Home() {
  let loggedIn = getCookie('logged_in');

  return (
    <>
      <NavBar loggedIn={loggedIn}/>

      <div className="flex h-screen items-center justify-center">
        <p className="text-3xl">Начни использовать мессенджер нового поколения
          <a href="/register" className="text-red-500"> прямо сейчас</a>
        </p>
      </div>
    </>
  );
}
