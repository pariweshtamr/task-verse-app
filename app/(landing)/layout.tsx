import { Footer } from "./_components/footer"
import { Navbar } from "./_components/navbar"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-bgMain flex flex-col">
      {/* Navbar */}
      <Navbar />
      <main className="pt-40 pb-20 bg-bgMain flex-shrink flex-grow basis-auto">
        {children}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
export default LandingLayout
