type TitleProps = {
  title: string
}
export const Title = ({ title }: TitleProps) => {
  return (
    <div className="text-2xl font-[800] relative after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:rounded-lg after:bg-[#3282B8]">
      {title}
    </div>
  )
}
