import { Sidebar } from "./_components/sidebar"

export async function generateMetadata() {
  return {
    title: "Dashboard",
  }
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex p-4 gap-4 md:max-w-screen-2xl md:mx-auto">
      <Sidebar />
      <div className="w-full flex-shrink flex-grow basis-auto border border-gray-200 shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  )
}
export default DashboardLayout
