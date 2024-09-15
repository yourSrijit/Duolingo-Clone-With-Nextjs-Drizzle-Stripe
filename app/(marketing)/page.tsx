import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

 function Home() {

  return (
    <div className="max-w-[988px] mx-auto flex-1 flex flex-col w-full lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[440px] lg:h-[440px] mb-8 lg:mb-0">
        <Image src="/home1.gif" fill alt="home image" unoptimized/>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-center text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px]">The free, fun, and effective way to learn a new language!🐲</h1>
        <div>
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
          </ClerkLoading>
          
          <ClerkLoaded>
            <SignedOut>
               <SignUpButton
               mode="modal">
                <Button variant="secondary" size="lg" className="w-full uppercase mb-3">
                  Get Started
                </Button>
               </SignUpButton>

               <SignInButton
               mode="modal">
                <Button variant="primaryOutline" size="lg" className="w-full uppercase">
                 i already have an account
                </Button>
               </SignInButton>
            </SignedOut>

            <SignedIn>
            <Button className="w-full uppercase" variant="primary" size="lg" asChild>
              <Link href="/learn">
              start your learning 🧜‍♂️
              </Link>
            </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
      
    </div>
  );
}

export default Home