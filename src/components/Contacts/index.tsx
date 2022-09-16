import React from 'react'

export default function Contacts() {
  return (
    <div className="flex flex-col items-center gap-8 border-t border-b py-10">
      <h3>Полезные ссылки</h3>
      <div className="flex items-center gap-8 font-serif text-3xl text-white tracking-widest drop-shadow-[0_0_1px_rgb(0,0,0)] uppercase">
        <ul className="flex flex-col gap-5 list-disc">
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="https://vk.com/aptem_oxa" target="_blank">Вконтакте</a>
          </li>
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="https://t.me/x7evenUpx" target="_blank">Телеграммъ</a>
          </li>
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="https://www.instagram.com/7_even_up" target="_blank">Нельзяграммъ</a>
          </li>
        </ul>
        <ul className="flex flex-col gap-5 list-disc">
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="http://ashel.site/" target="_blank">Сайт-Портфолио</
          a></li>
          <li className="hover:text-slate-700 hover:drop-shadow-none transition-all">
            <a href="https://github.com/7evenUp" target="_blank">Github</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
