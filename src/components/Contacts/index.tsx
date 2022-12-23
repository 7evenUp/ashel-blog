import React from "react";

export default function Contacts() {
  return (
    <div className="flex flex-col items-center gap-8 border-t border-b py-10">
      <h3>Полезные ссылки</h3>
      <div
        className="flex flex-col items-start gap-5 text-2xl font-serif text-white drop-shadow-[0_0_1px_rgb(0,0,0)] uppercase
                      md:flex-row md:items-center md:gap-8 md:text-3xl md:tracking-widest"
      >
        <ul className="flex flex-col gap-5 list-disc">
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="https://vk.com/aptem_oxa" target="_blank" rel="noreferrer">
              Вконтакте
            </a>
          </li>
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="https://t.me/x7evenUpx" target="_blank" rel="noreferrer">
              Телеграммъ
            </a>
          </li>
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a
              href="https://www.instagram.com/7_even_up"
              target="_blank"
              rel="noreferrer"
            >
              Нельзяграммъ
            </a>
          </li>
        </ul>
        <ul className="flex flex-col gap-5 list-disc">
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="http://ashel.site/" target="_blank" rel="noreferrer">
              Сайт-Портфолио
            </a>
          </li>
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a
              href="https://github.com/7evenUp"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
