import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center min-h-screen p-4 pb-40">
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout
