"use client"

import { courses, userProgress } from "@/db/schema"
import { Card } from "./Card"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { upsertUserProgress } from "@/action/user-progress"

type Props={
    courses: typeof courses.$inferSelect[],
    activeCourseId?:typeof userProgress.$inferInsert.activeCourseId
}



export const List=({courses,activeCourseId}:Props)=>{   
    const [pending, startTransition] = useTransition()

    const router=useRouter();
    const onClick=(id:number)=>{
        if(pending) return;
        
        if(id == activeCourseId){
            return router.push("/learn");
        }
        startTransition(()=>{
            upsertUserProgress(id);
        });
    };


        return (
            <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]
             gap-4">
                {
                    courses.map((course)=>(
                        <Card
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        imageSrc={course.imageSrc}
                        onClick={onClick}
                        disable={pending}
                        active={course.id === activeCourseId}
                        />
                    ))
                }
            </div>
        )

}