import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, point, serial, text, varchar } from "drizzle-orm/pg-core";
import { title } from "process";

export const courses=pgTable("courses",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    imageSrc:text("img_src").notNull(),
})

export const coursesRelations= relations(courses,({ many }) =>(({
    userProgress:many(userProgress),
    units:many(units)
}))
)

///Units
export const units=pgTable("units",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    description: text("description").notNull(),
    courseId:integer("course_id").references(() => courses.id ,{onDelete:"cascade"}).notNull(),
    order:integer("order").notNull(),
})

export const unitsRelations = relations(units,({ many,one })=>({
    courses:one(courses,{
        fields:[units.courseId],
        references:[courses.id]
    }),
    lessons:many(lessons),
}))

//Lesson Table
export const lessons=pgTable("lessons",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    unitId:integer("unit_id").references(()=> units.id ,{ onDelete:"cascade"}).notNull(),
    order:integer("order").notNull(),
})

export const lessonsRelations=relations(lessons,({one,many})=>({
    unit:one(units,{
        fields:[lessons.unitId],
        references:[units.id],
    }),
    challenges:many(challenges)
}))

//Challenges
export const challengesEnum= pgEnum("type",["SELECT","ASSIST"]);

export const challenges=pgTable("challenges",{
    id:serial("id").primaryKey(),
    lessonId:integer("lesson_id").references(()=> lessons.id ,{onDelete:"cascade"}).notNull(),
    type :challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order:integer("order").notNull()

})
export const challengesRelations=relations(challenges,({one,many})=>
({
    lessons:one(lessons,{
        fields:[challenges.lessonId],
        references:[lessons.id]
    })
}))

//User Progress
export const userProgress =pgTable("user_progress",{
    userId:text("user_id").primaryKey(),
    userName:text("user_name").notNull().default("User"),
    userImageSrc:text("user_image_src").notNull().default('/user.png'),
    activeCourseId:integer("active_course_id").references(()=> courses.id ,{onDelete : "cascade"}),
    hearts:integer("hearts").notNull().default(6),
    points:integer("point").notNull().default(0)
})


export const userProgressRelations = relations(userProgress, ({one}) => ({
    activeCourse:one(courses ,{
        fields:[userProgress.activeCourseId],
        references:[courses.id]
    }),
}));