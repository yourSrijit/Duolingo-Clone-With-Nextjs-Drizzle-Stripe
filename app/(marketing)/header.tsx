import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
 
function Header() {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-x-3">
          <Image src="/logo.png" height={60} width={60} alt="logo img" />
          <h1 className="text-2xl font-bold text-green-600 tracking-wide inline-block">
            Lingo
          </h1>
        </div>

        {/* Show loading spinner when Clerk is loading */}
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        {/* Show UserButton when Clerk has loaded and user is signed in */}
        <ClerkLoaded>
          <SignedIn>
            <UserButton 
            afterSignOutUrl="/"
            />
          </SignedIn> 

          <SignedOut>
            
          <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn"> 
          <Button size="lg" variant="ghost">
            Login
          </Button>
          </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
}

export default Header;
