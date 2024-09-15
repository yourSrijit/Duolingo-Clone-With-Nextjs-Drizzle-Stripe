import { Button } from "@/components/ui/button"
import Image from "next/image"

function Footer() {
  return (
    <footer className="hidden lg:block w-full h-20 bottom-0 border-slate-200 border-t-2 p-2">
      <div className="felx max-w-screen-lg mx-auto flex items-center justify-evenly h-full"> 
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/hr.png" alt="Croatian" height={32} width={40} className="mr-4 rounded-md"/>
          Croatian
        </Button>

        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/in.png" alt="Hindi" height={32} width={40} className="mr-4 rounded-md"/>
          Hindi
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/es.png" alt="Spanish" height={32} width={40} className="mr-4 rounded-md"/>
          Spanish
        </Button>

        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/fr.png" alt="French" height={32} width={40} className="mr-4 rounded-md"/>
          French
        </Button>

        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/jp.png" alt="Japanese" height={32} width={40} className="mr-4 rounded-md"/>
          Japanese
        </Button>
      </div>

    </footer>
  )
}

export default Footer