import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const Gallery: NextPage = () => {
  return (
    <>
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Фотки
      </h1>
      <div className="grid grid-cols-2 gap-2">
        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] sm:h-[300px] relative">
          <Image
            className="object-cover"
            src="https://random.imagecdn.app/400/400"
            width={400}
            height={400}
          />
        </div>

        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] sm:h-[300px] relative">
          <Image
            className="object-cover"
            src="https://random.imagecdn.app/400/400"
            width={400}
            height={400}
          />
        </div>
        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] sm:h-[300px] relative">
          <Image
            className="object-cover"
            src="https://random.imagecdn.app/400/400"
            width={400}
            height={400}
          />
        </div>
        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] sm:h-[300px] relative">
          <Image
            className="object-cover"
            src="https://random.imagecdn.app/400/400"
            width={400}
            height={400}
          />
        </div>
        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] sm:h-[300px] relative">
          <Image
            className="object-cover"
            src="https://random.imagecdn.app/400/400"
            width={400}
            height={400}
          />
        </div>
        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] sm:h-[300px] relative">
          <Image
            className="object-cover"
            src="https://random.imagecdn.app/400/400"
            width={400}
            height={400}
          />
        </div>
      </div>
    </>
  );
};

export default Gallery;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
