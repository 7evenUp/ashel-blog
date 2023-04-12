import * as Tabs from "@radix-ui/react-tabs"
import Link from "next/link"

const AboutTabs = () => {
  return (
    <Tabs.Root defaultValue="code">
      <Tabs.List className="flex flex-col items-start gap-2 my-12">
        <Tabs.Trigger
          value="code"
          className="text-beige text-[20px] data-[state=active]:text-beige-dark data-[state=active]:underline underline-offset-8 hover:opacity-70"
        >
          Программист
        </Tabs.Trigger>
        <Tabs.Trigger
          value="design"
          className="text-beige text-[20px] data-[state=active]:text-beige-dark data-[state=active]:underline underline-offset-8 hover:opacity-70"
        >
          Дизайнер
        </Tabs.Trigger>
        <Tabs.Trigger
          value="crypto"
          className="text-beige text-[20px] data-[state=active]:text-beige-dark data-[state=active]:underline underline-offset-8 hover:opacity-70"
        >
          Работник в криптовалюте
        </Tabs.Trigger>
        <Tabs.Trigger
          value="sport"
          className="text-beige text-[20px] data-[state=active]:text-beige-dark data-[state=active]:underline underline-offset-8 hover:opacity-70"
        >
          Спортсмен
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="code" className="flex flex-col gap-6">
        <p className="text-black text-lg w-[380px]">
          Начал свой путь программиста в 2017. Началось с обычных сайтиков на
          HTML и CSS. Продолжилось созданием интерфейсов на React.js и серверной
          части на Node.js. Сейчас с Next.js работаю и мобилки на React Native
          делаю. Могу немного Python - парсинг сайтов, ИИ. Еще в Web3
          развиваюсь.
        </p>
        <Link
          href="https://ashel-portfolio.vercel.app/"
          target="_blank"
          className="w-fit px-6 py-3 bg-red text-white text-lg hover:bg-red-light transition-colors"
        >
          Мой сайт портфолио
        </Link>
      </Tabs.Content>
      <Tabs.Content value="design" className="flex flex-col gap-6">
        <p className="text-black text-lg w-[380px]">
          Параллельно с версткой сайтов приходилось учить дизайн, так как
          хотелось отличаться от других и не делать сайты по шаблонам.
          Бесконечно учу стили и направления дизайна, постоянно развиваюсь и
          работаю над своими UI/UX скиллами.
        </p>
      </Tabs.Content>
      <Tabs.Content value="crypto" className="flex flex-col gap-6">
        <p className="text-black text-lg w-[380px]">
          В 2021 году, в разгар хайпа крипты, я вошёл в эту сферу. Я прошёл путь
          от регистрации на бинансе до торговли no-name NFTишками. Делаю
          теханализ, торгую фьючами, делаю обзор NFT, пишу об этом в телеграмме.
        </p>
        <Link
          href="https://t.me/ashel_crypto"
          target="_blank"
          className="w-fit px-6 py-3 bg-red text-white text-lg hover:bg-red-light transition-colors"
        >
          Читать
        </Link>
      </Tabs.Content>
      <Tabs.Content value="sport" className="flex flex-col gap-6">
        <p className="text-black text-lg w-[380px]">
          С самого детства занимался футболом, хоккеем и волейболом. В 2017
          заиграл в большой футбол 11х11. На данный момент прекратил карьеру,
          однако про спорт не забываю и постоянно поддерживаю физическую форму в
          тонусе.
        </p>
        <Link
          href="https://www.instagram.com/ashel_sport/"
          target="_blank"
          className="w-fit px-6 py-3 bg-red text-white text-lg hover:bg-red-light transition-colors"
        >
          Нельзяграмм
        </Link>
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default AboutTabs
