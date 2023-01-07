import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const Gallery: NextPage = () => {
  return (
    <>
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Фотки
      </h1>
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