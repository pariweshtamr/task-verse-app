import { cn } from "@/lib/utils"

type TitleProps = {
  title: string
  className?: string
}
export const Title = ({ title, className }: TitleProps) => {
  return (
    <div
      className={cn(
        "text-2xl font-[800] relative after:absolute after:-bottom-2 after:left-1/2 after:translate-x-[-50%] md:after:translate-x-0 md:after:left-0 after:w-12 after:h-1 after:rounded-lg after:bg-[#3282B8]",
        className
      )}
    >
      {title}
    </div>
  )
}
