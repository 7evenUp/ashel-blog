import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import AboutTabs from "../components/AboutTabs"
import Socials from "../components/Socials"
import handsomePic from "../../public/images/handsome.png"

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex justify-between pb-10">
      <Head>
        <title>Ashel Blog</title>
        <meta
          name="description"
          content="Блог о личном, интеллектуальном и о непревзойдённом. Тут вы этого не увидите."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>

      <main className="flex-1">
        <header className="bg-olive w-[640px] h-[225px] flex flex-col justify-between pl-28">
          <div className="flex items-center gap-20 pt-6 text-white">
            <Link href="/blog" className="hover:underline underline-offset-8">
              Блог
            </Link>

            <Socials />
          </div>
          <h1 className="text-8xl text-white font-hand">Обо мне</h1>
        </header>

        <div className="pl-28">
          <AboutTabs />
        </div>
      </main>

      <Image
        className="h-max"
        src={handsomePic}
        alt="Handsome photo of me"
        width={550}
        quality={100}
        priority
      />
    </div>
  )
}

export default Home
