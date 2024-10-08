import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { courses, lessons, units, userProgress ,challengeProgress} from "./schema";
import { eq } from "drizzle-orm";


export const getCourses=cache(
    async()=>{
        const data=await db.query.courses.findMany();
        return data;
    }
);


export const getUserProgress=cache(async()=>{
    const {userId}=await auth();
    if(!userId){
        return null;
    }
    const data= await db.query.userProgress.findFirst({
        where: eq(userProgress.userId,userId),
        with:{
            activeCourse:true
        },

    });
    return data;
})

//Units
export const getUnits=cache(async()=>{
    const {userId} =await auth();

    const userProgress=await getUserProgress();
    if(!userId || !userProgress?.activeCourseId){
        return [];
    }

    //TOD : Confirm wheather order is required or not
    const data=await db.query.units.findMany({
        where: eq(units.courseId,userProgress.activeCourseId),
        with:{
            lessons:{
                with:{
                    challenges:{
                        with:{
                            challengeProgress:{
                                where: eq(challengeProgress.userId,userId)
                            }
                        },
                    },
                },
            },
        },
    });

    const normalizeData=data.map((unit)=>{
        const lessonsWithCompletedStatus=unit.lessons.map((lesson)=>{
            const allCompletedChallenges=lesson.challenges.every((challenge)=>{
                return challenge.challengeProgress
                && challenge.challengeProgress.length > 0
                && challenge.challengeProgress.every((progress)=> progress.completed);
            });

            return {...lesson,
                    completed:allCompletedChallenges
                };

        })

        // Return the unit with updated lessons
            return {
                ...unit,
                lessons: lessonsWithCompletedStatus
            };

    });
    return normalizeData;

});


export const getCourseById=cache(async(courseId:number)=>{
    const data=await db.query.courses.findFirst({
        where:eq(courses.id,courseId),
        //Todo : Populate units and lessons
    });
    return data;
})