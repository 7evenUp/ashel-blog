import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

export default function Header() {
  const router = useRouter();
  console.log(router.pathname)

  return (
    <div className="w-full flex items-center justify-center border-b border-slate-700 py-4 sticky top-0">
      <ul className="flex gap-10">
        <li className={router.pathname === '/' ? 'font-semibold' : ''}>
          <Link href="/">
            <a>Обо мне</a>
          </Link>
        </li>
        <li className={router.pathname === '/blog' ? 'font-semibold' : ''}>
          <Link href="/blog">
            <a>Блог</a>
          </Link>
        </li>
        <li className={router.pathname === '/gallery' ? 'font-semibold' : ''}>
          <Link href="/gallery">
            <a>Фотокарточки</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
