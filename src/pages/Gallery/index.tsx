import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import ImageWrapper from "../../components/ImageWrapper";

const Gallery: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["example.getAll"]);

  return (
    <>
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Здесь крутые фотокарточки!
      </h1>
      <div>
        {error && <p>Error happend here: {error.message}</p>}
        {isLoading && <p>Loading photos...</p>}
        {data &&
          data.map((el) => {
            return (
              <ImageWrapper
                key={el.id}
                title={el.title}
                desc={el.desc}
                src={el.src}
              />
            );
          })}
      </div>
    </>
  );
};

export default Gallery;
