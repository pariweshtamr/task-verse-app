import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"
import NextTopLoader from "nextjs-toploader"
import { ModalProvider } from "@/components/providers/modal-provider"

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <NextTopLoader
        height={4}
        color="#27ae60"
        easing="cubic-bezier(0.53,0.21,0.1)"
        showSpinner={false}
      />
      <ModalProvider />
      <Toaster />
      <div className="bg-bgMain h-full">{children}</div>
    </ClerkProvider>
  )
}
export default PlatformLayout
