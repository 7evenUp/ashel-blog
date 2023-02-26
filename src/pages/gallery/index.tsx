import type { NextPage } from "next";

const Gallery: NextPage = () => {
  return (
    <>
      <GalleryHeading title="Эстетика, которую я полюбил" />
      <div className="grid gap-2 lg:gap-4 w-full lg:grid-cols-2 2xl:grid-cols-3 mt-5">
        {/* {data &&
          data.map((photo) => (
            <GalleryImage path={photo.src} key={photo.id} alt={photo.title} />
          ))} */}
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
