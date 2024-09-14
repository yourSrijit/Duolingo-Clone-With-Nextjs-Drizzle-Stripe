import { ClerkLoaded, ClerkLoading,SignedIn, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"
import Image from "next/image"

function Header() {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
      <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 flex-row">
        <Image src="/logo.png" height={60} width={60} alt="logo img"/>
        <h1  className="text-2xl font-bold text-green-600 tracking-wide inline-block">Lingo</h1>
      </div>
    <ClerkLoading>
    <Loader className="h5 w5 text-muted-foreground animate-spin"/>
    </ClerkLoading>

    <ClerkLoaded>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </ClerkLoaded>



      </div>
    </header>
  )
}

export default Header