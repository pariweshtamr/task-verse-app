import { Sidebar } from "./_components/sidebar"

export async function generateMetadata() {
  return {
    title: "Dashboard",
  }
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex p-4 gap-4 md:max-w-screen-2xl md:mx-auto relative">
      <div className="md:flex hidden">
        <Sidebar />
      </div>

      <div className="w-full h-full flex-shrink flex-grow basis-auto border border-borders shadow-lg rounded-xl bg-bg p-6 md:p-8 overflow-y-auto customscroll">
        {children}
      </div>
    </div>
  )
}
export default DashboardLayout
