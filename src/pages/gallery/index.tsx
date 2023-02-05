import type { NextPage } from "next";
import { trpc } from "../../lib/trpc";
import { GalleryImage } from "../../components/";

const Gallery: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["gallery.getAll"]);

  if (error)
    return (
      <h1 className="text-2xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Ошибка на сервере: {error.message}
      </h1>
    );

  if (isLoading)
    return (
      <h1 className="text-2xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Загружаю тебе фоточки...
      </h1>
    );

  return (
    <>
      <h1 className="text-2xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Эстетика, которую я полюбил
      </h1>
      <div className="grid gap-2 lg:gap-4 w-full lg:grid-cols-2 2xl:grid-cols-3 mt-5">
        {data &&
          data.map((photo) => <GalleryImage path={photo.src} key={photo.id} />)}
      </div>
    </>
  );
};

export default Gallery;
