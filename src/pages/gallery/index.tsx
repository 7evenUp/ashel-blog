import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { ImageWrapper } from "../../components";
import Image from "next/image";

const Gallery: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["example.getAll"]);

  return (
    <>
      <h1 className="text-2xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Эстетика, которую я полюбил
      </h1>
      <div className="grid gap-2 lg:gap-4 w-full lg:grid-cols-2 2xl:grid-cols-3 mt-5">
        {[
          "https://images.unsplash.com/photo-1671726805766-de50e4327182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1673537074513-e66435b69012?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
          "https://images.unsplash.com/photo-1673363006135-b298da87a3de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1673546803288-488dbba044c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1673557143243-39f2995a3bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1671725501884-e832fb8d0d84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1673423050335-43b991cf57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
        ].map((el, key) => {
          return (
            <div className="relative w-full h-72 sm:h-80 md:h-96" key={key}>
              <Image
                className="object-cover"
                src={el}
                layout={"fill"}
                sizes="(max-width: 1536px) 100vw,(max-width: 1024px) 50vw,33vw"
              />
            </div>
          );
        })}
      </div>
      {/* <div>
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
      </div> */}
    </>
  );
};

export default Gallery;
