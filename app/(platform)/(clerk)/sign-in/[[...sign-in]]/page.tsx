import Logo from "@/components/logo"
import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      <Logo
        height={70}
        width={70}
        linkClassName="absolute top-10"
        pClassName="!text-5xl"
      />
      <SignIn />
    </div>
  )
}
export default SignInPage
