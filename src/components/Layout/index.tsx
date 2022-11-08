import React from "react";
import Footer from "../Footer";
import Header from "../Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center min-h-screen p-4 pb-40">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
