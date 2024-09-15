"use client"

import { usePathname } from "next/navigation";
import { Button } from "./ui/button"
import Link from "next/link";
import Image from "next/image";

type Props={
  label:string;
  icon:string;
  href:string;
}
function SidebarItem({label,icon,href}:Props) {
  const pathname=usePathname();
  const active=pathname === href;
  return (
    <Button variant={active ? "sidebarOutline" : "sidebar"} className="h-[52px] justify-start uppercase" asChild>
      <Link href={href}>
      <Image src={icon} alt={label} className="mr-5" height={50} width={50}/>
      {label}
      </Link>
    </Button>
  )
}

export default SidebarItem