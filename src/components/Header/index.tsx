import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="w-full flex items-center justify-center border-b border-slate-700 py-4 sticky top-0">
      <h2 className="text-xl text-slate-700">Header</h2>
      <ul>
        <li>
          <Link href="/blog">
            <a>Блог</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a>Фотокарточки</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
