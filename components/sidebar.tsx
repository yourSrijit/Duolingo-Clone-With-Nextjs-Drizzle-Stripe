import { cn } from "@/lib/utils";

type Props={
    className?:string;
};

function Sidebar({className}:Props) {
  return (
    <div className={cn("flex bg-blue-800 h-full lg:w-[256px] lg:fixed top-0 left-0 px-4 border-r-2 flex-col",className,)}>
    Sidebar
    </div>
  )
}

export default Sidebar