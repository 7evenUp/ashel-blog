import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import { supabase } from "../../supabase/supabaseClient";
import ImageWrapper from "./components/ImageWrapper";

const Gallery: NextPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Photo')
        .select('*')

      if (error) console.error(error)

      console.log(data)

      setData(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Здесь крутые фотокарточки!
        </h1>
        <div>
          {data.map(el => {
            return (
              <ImageWrapper key={el.id} title={el.title} desc={el.desc} src={el.src} />
            )
          })}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Gallery
