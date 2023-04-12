import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full flex items-center justify-center border-b border-slate-700 py-4 sticky top-0 bg-white z-10">
      <ul className="flex gap-5 sm:gap-10 sm:text-xl">
        <li className={router.pathname === "/" ? "font-semibold" : ""}>
          <Link href="/">Обо мне</Link>
        </li>
        <li className={router.pathname === "/blog" ? "font-semibold" : ""}>
          <Link href="/blog">Блог</Link>
        </li>
      </ul>
    </header>
  );
}
