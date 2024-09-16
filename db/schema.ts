import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const courses=pgTable("courses",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    imageSrc:text("img_src").notNull(),
})