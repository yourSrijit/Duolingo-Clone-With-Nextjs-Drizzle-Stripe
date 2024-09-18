import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props={
    className?:string;
};

function Sidebar({className}:Props) {
  return (
    <div className={cn("flex h-full bg-white lg:w-[256px] lg:fixed top-0 left-0 px-4 border-r-2 flex-col",className,)}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/duo.gif" height={40} width={40} alt="logo img" className="rounded-sm" unoptimized/>
          <h1 className="text-2xl font-bold text-green-600 tracking-wide inline-block">
            duoLingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-y-6">
        <SidebarItem label="Learn" href="/learn" icon="/home.png"/>
        <SidebarItem label="leaderboard" href="/leaderboard" icon="/leaderboard.png"/>
        <SidebarItem label="quests" href="/quests" icon="/quests.png"/>
        <SidebarItem label="shop" href="/shop" icon="/shop.png"/>
        
      </div>

      <div className="p-4 mb-2">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/"/>
        </ClerkLoaded>
      </div>
    </div>
  )
}

export default Sidebar