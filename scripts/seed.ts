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

        console.log("Sedding finished");
    }catch(error){
        console.log(error);
    throw new Error("Failed to seed the databse");  
     } 
}

main();