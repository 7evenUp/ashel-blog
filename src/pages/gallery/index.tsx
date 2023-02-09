import type { NextPage } from "next";
import { trpc } from "../../lib/trpc";
import { GalleryImage } from "../../components/";

const Gallery: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["gallery.getAll"]);

  if (error)
    return <GalleryHeading title={`Ошибка на сервере: ${error.message}`} />;

  if (isLoading)
    return <GalleryHeading title="Загружаю тебе фоточки..." />;

  return (
    <>
      <GalleryHeading title="Эстетика, которую я полюбил" />
      <div className="grid gap-2 lg:gap-4 w-full lg:grid-cols-2 2xl:grid-cols-3 mt-5">
        {data &&
          data.map((photo) => (
            <GalleryImage path={photo.src} key={photo.id} alt={photo.title} />
          ))}
      </div>
    </>
  );
};

export default Gallery;

const GalleryHeading = ({ title }: { title: string }) => (
  <h1 className="text-2xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
    {title}
  </h1>
);
