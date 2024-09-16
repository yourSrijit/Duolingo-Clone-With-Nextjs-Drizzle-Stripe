import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { InfinityIcon } from "lucide-react"

type Props={
    activeCourse:any,
    hearts:number,
    points:number,
    hasActiveSubscription:boolean
}

export const UserProgress =({activeCourse,points,hearts,hasActiveSubscription}:Props)=>{
    return (
        <div className="flex justify-between items-center gap-x-2 w-full">
            <Link href="/course">
            <Button variant="ghost">
                <Image
                src={activeCourse.img}
                alt={activeCourse.title}
                width={36}
                height={36}
                className="rounded-md border"
                />
            </Button>
            </Link>

            <Link href="/shop">
            <Button variant="ghost" className="text-orange-500">
                <Image src="/point.png" width={25} height={25} alt="Points" className="mr-2"/>
                {points}
            </Button>
            </Link>

            <Link href="/shop">
            <Button variant="ghost" className="text-rose-500">
                <Image src="/heart.png" width={28} height={28} alt="Hearts" className="mr-2"/>
                {
                    hasActiveSubscription ? <InfinityIcon className="h-5 w-5 stroke-[3]"/>
                    : hearts
                }
            </Button>
            </Link>
        </div>
    )
}