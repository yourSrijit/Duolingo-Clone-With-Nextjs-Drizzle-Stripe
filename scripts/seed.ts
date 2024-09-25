import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as Schema from "../db/schema";

const sql=neon(process.env.DRIZZLE_DATABASE_URL!);

//@ts-ignore
const db=drizzle(sql, {Schema});

const main = async()=>{
    try{
        console.log("Seeding Database");
        
        await db.delete(Schema.courses);
        await db.delete(Schema.userProgress);
        await db.delete(Schema.units);
        await db.delete(Schema.lessons);
        await db.delete(Schema.challenges);
        await db.delete(Schema.challengeOptions);
        await db.delete(Schema.challengeProgress);

        await db.insert(Schema.courses).values([
            {
                id:1,
                title:"Spanish",
                imageSrc:"/es.png"
            },
            {
                id:2,
                title:"Croatian",
                imageSrc:"/hr.png"
            },
            {
                id:3,
                title:"Hindi",
                imageSrc:"/in.png"
            },
            {
                id:4,
                title:"French",
                imageSrc:"/fr.png"
            },
            {
                id:5,
                title:"Japanese",
                imageSrc:"/jp.png"
            },
        ])

        //Units
        await db.insert(Schema.units).values([
            {
                id:1,
                courseId:1,
                title:"Unit 1",
                description:"Learn the basics of Spanish",
                order:1,
            }
        ]);

        //Lessons
        await db.insert(Schema.lessons).values([
            {
                id:1,
                unitId:1,
                order:1,
                title:"Nouns"
            },
            // {
            //     id:2,
            //     unitId:1,
            //     order:2,
            //     title:"Verbs"
            // }
        ])

        //Challenges
        await db.insert(Schema.challenges).values([
            {
                id:1,
                lessonId:1, //NOUN
                type:"SELECT",
                order:1,
                question:' Which one of these is the "the man" ?',
            }
        ])

        //Challenges Opton
        await db.insert(Schema.challengeOptions).values([
            {
                id:1,
                challengeId:1,
                imageSrc:"/man.png",
                correct:true,
                text:"el hombre",
                audioSrc:"/es_man.mp3"
            },
            {
                id:2,
                challengeId:1,
                imageSrc:"/woman.png",
                correct:false,
                text:"la mujer",
                audioSrc:"/es_woman.mp3"
            },
            {
                id:3,
                challengeId:1,
                imageSrc:"/robot.png",
                correct:false,
                text:"el robot",
                audioSrc:"/es_robot.mp3"
            },
        ])


        console.log("Sedding finished");
    }catch(error){
        console.log(error);
    throw new Error("Failed to seed the databse");  
     } 
}

main();