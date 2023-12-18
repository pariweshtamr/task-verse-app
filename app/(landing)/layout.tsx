import { Footer } from "./_components/footer"
import { Navbar } from "./_components/navbar"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-bgMain">
      {/* Navbar */}
      <Navbar />
      <main className="pt-40 pb-20 bg-bgMain">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
export default LandingLayout
