import Logo from "@/components/logo"
import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      <Logo
        height={70}
        width={70}
        linkClassName="absolute top-10"
        pClassName="!text-5xl"
      />
      <SignUp />
    </div>
  )
}
export default SignUpPage
