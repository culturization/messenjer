"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { AiFillAliwangwang } from "react-icons/ai";

export function NavBar(loggedIn) {
  const router = useRouter()

  return (
    <>
      <div
        className="fixed top-0 w-full flex justify-center border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all"
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <p>Mesenjer</p>
          </Link>
          <div>
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black mx-3"
                onClick={() => router.push('/login')}
              >
                Войти
              </button>
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black mx-3"
                onClick={() => router.push('/register')}
              >
                Создать аккаунт
              </button>

              {loggedIn ? <Link href="/app"><AiFillAliwangwang className="w-10 h-10 mx-5 rounded-full inline" /></Link> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}