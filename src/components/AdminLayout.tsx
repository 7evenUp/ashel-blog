import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <header className="w-full flex items-center justify-center border-b border-slate-700 py-4 sticky top-0 bg-white z-10">
        <ul className="flex gap-5 sm:gap-10 sm:text-xl">
          <li
            className={router.pathname === "/admin/blog" ? "font-semibold" : ""}
          >
            <Link href="/admin/blog">Блог</Link>
          </li>
          <li
            className={
              router.pathname === "/admin/gallery" ? "font-semibold" : ""
            }
          >
            <Link href="/admin/gallery">Фотки</Link>
          </li>
        </ul>
      </header>
      <main className="container mx-auto flex flex-col items-center min-h-screen p-4 pb-40">
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
