export default () => (
  <div className="flex flex-col items-center gap-8 border-t border-b py-10">
    <h3>Полезные ссылки</h3>
    <div
      className="flex flex-col items-start gap-5 text-2xl font-serif text-white uppercase
                    md:flex-row md:items-center md:gap-8 md:text-3xl md:tracking-widest"
    >
      <ul className="flex flex-col gap-5 list-disc ">
        <StyledLiWithLink href="https://vk.com/aptem_oxa" title="Вконтакте" />
        <StyledLiWithLink href="https://t.me/x7evenUpx" title="Телеграммъ" />
        <StyledLiWithLink
          href="https://www.instagram.com/7_even_up"
          title="Нельзяграммъ"
        />
      </ul>
      <ul className="flex flex-col gap-5 list-disc">
        <StyledLiWithLink
          href="https://7evenup.github.io/ashel-portfolio/build/index.html"
          title="Сайт-Портфолио"
        />
        <StyledLiWithLink href="https://github.com/7evenUp" title="Github" />
      </ul>
    </div>
  </div>
);

const StyledLiWithLink = ({ href, title }: { href: string; title: string }) => (
  <li className="drop-shadow-[0_0_1px_rgb(0,0,0)] hover:text-black hover:drop-shadow-none transition-all">
    <a href={href} target="_blank" rel="noreferrer">
      {title}
    </a>
  </li>
);
