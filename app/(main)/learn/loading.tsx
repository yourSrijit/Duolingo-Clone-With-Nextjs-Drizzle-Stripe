import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">

    <Loader className="h-6 w-6 animate-spin text-foreground"/>
    </div>
  )
}

export default Loading