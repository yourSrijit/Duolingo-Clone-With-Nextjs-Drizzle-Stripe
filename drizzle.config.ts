import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./migration",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
});



// import "dotenv/config"
// import type { Config } from "drizzle-kit";

// export default {
//     dialect:"postgresql",
//     schema:"./db/schema.ts",
//     out:"./migration",
//     dbCredentials:{
//         url: process.env.DRIZZLE_DATABASE_URL!,
//     },
// } satisfies Config;  