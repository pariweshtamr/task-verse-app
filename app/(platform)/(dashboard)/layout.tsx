import db from "@/lib/db"
import { Sidebar } from "./_components/sidebar"
import { Topbar } from "./_components/top-bar"
import { auth } from "@clerk/nextjs"
import moment from "moment"

export async function generateMetadata() {
  return {
    title: "Dashboard",
  }
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()
  const tasks = await db.task.findMany({
    where: {
      userId,
      date: {
        gte: moment().toISOString(),
        lte: moment().add(3, "days").toISOString(),
      },
    },
  })

  return (
    <div className="h-screen flex p-4 gap-4 md:max-w-screen-2xl md:mx-auto relative">
      <div className="md:flex hidden">
        <Sidebar />
      </div>
      <div className="w-full h-full flex-shrink flex-grow basis-auto border border-borders shadow-lg rounded-xl bg-bg p-6 md:p-8 overflow-y-auto customscroll">
        <Topbar dueTasks={tasks} />
        {children}
      </div>
    </div>
  )
}
export default DashboardLayout
