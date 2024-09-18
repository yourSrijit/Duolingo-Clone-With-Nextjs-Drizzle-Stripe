<h1 align="center">Currently in Development phase 🐲</h1>

# Duolingo clone using Nextjs,Drizzle and Stripe
```bash
git clone https://github.com/yourSrijit/Duolingo-Clone-With-Nextjs-Drizzle-Stripe.git

cd Duolingo-Clone-With-Nextjs-Drizzle-Stripe

npm install
npm run dev
```


https://d35aaqx5ub95lt.cloudfront.net/favicon.ico icon

## Drizzle Setup and DB Connection ⭐🫠
First of all we need any database link do we can do crus operation remotly .neon .aiven is the best option for postgras databse

1. Create one postgres link and install this dependencies
```npm
npm i drizzle-orm @neondatabase/serverless
npm i -D drizzle-kit
```

2. Create a `schema.ts` file for you table like this for your table and model

```javascript

import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const courses=pgTable("courses",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    imageSrc:text("img_src").notNull()
})
```

3. Create one `drizzle.ts` file for the db
```javascript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from "./schema"

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql,{schema});

export default db



⭐⭐⭐⭐⭐
// you can done operation like this way 

const result = await db.query.users.findMany({
  with: {
    posts: true      
  },
});
//and if you have multiple schema then you can do this way
import * as schema1 from './schema1';
import * as schema2 from './schema2';
import { drizzle } from 'drizzle-orm/...';
const db = drizzle(client, { schema: { ...schema1, ...schema2 } });
```
4. Time to Configure the drizzle `drizzle.config.ts`

```javascript
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",     //which type of databse
  schema: "./db/schema.ts",  //where the schema file exists
  out: "./migration",        //Store migration files, meta, and journal
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,  //db url
  },
});
 
```
5. Run this commands 

```npm
npx drizzle-kit push: Pushes the current database migration to the database.
npx drizzle-kit studio: Opens a web interface to manage and visualize the database schema.
npx drizzle-kit up: Runs the pending migrations to update the database schema.
npx drizzle-kit generate --name init_db: Generates a new migration file with the name `init_db`.
drizzle-kit migrate: Executes all pending migrations to synchronize the database with the latest schema.
```
---
## Seed Databse 
Database seeding is populating a database with an initial set of data. It is common to load seed data such as initial user accounts or dummy data upon initial setup of an application.

```javascript
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
```






---
## This is for me || May be helps tooooo u
Here’s an explanation of the **Clerk**-related parts of the code:

```tsx
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
```
- **ClerkLoaded**: This component ensures that its children are rendered **only after Clerk has finished loading** (i.e., when the user’s authentication state is determined).
- **ClerkLoading**: Renders its children while Clerk is **still loading** (before the user's authentication state is known).
- **SignedIn**: Renders its children **only when the user is signed in**.
- **SignedOut**: Renders its children **only when the user is signed out**.
- **SignInButton**: A button component provided by Clerk that triggers the sign-in flow, which can be shown as a modal or redirect.
- **UserButton**: Displays the current signed-in user’s profile image and provides options like signing out and accessing user settings.

### Clerk Loading Logic:
```tsx
<ClerkLoading>
  <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
</ClerkLoading>
```
- **ClerkLoading** ensures that while Clerk is determining the authentication state (i.e., loading), a **spinner** is displayed. In this case, the `Loader` component is shown, providing visual feedback to the user.

### When Clerk is Loaded (User Auth is Known):
```tsx
<ClerkLoaded>
  <SignedIn>
    <UserButton />
  </SignedIn>
  
  <SignedOut>
    <SignInButton 
      mode="modal"
      afterSignInUrl="/learn"
      afterSignUpUrl="/learn"
    >
      <Button size="lg" variant="ghost">
        Login
      </Button>
    </SignInButton>
  </SignedOut>
</ClerkLoaded>
```
- **ClerkLoaded** wraps the entire block, ensuring that this part is only rendered **after Clerk has finished loading**.
- **SignedIn**: If the user is authenticated, the `UserButton` is rendered. This allows the user to manage their profile, sign out, etc.
- **SignedOut**: If the user is not authenticated, the `SignInButton` is displayed. This triggers the **sign-in flow** via a modal. The `afterSignInUrl` and `afterSignUpUrl` options ensure that the user is redirected to the `/learn` page after signing in or signing up.

### SignInButton Options:
- **mode="modal"**: This makes the sign-in page appear as a modal instead of a full-page redirect.
- **afterSignInUrl**: Redirects the user to the specified URL (`/learn`) after they successfully sign in.
- **afterSignUpUrl**: Redirects the user to the same URL (`/learn`) after they successfully sign up.

### Summary:
1. **ClerkLoading**: Shows a spinner while Clerk is determining the user's state.
2. **ClerkLoaded**: Ensures content is rendered only after Clerk finishes loading.
3. **SignedIn**: Renders the user’s profile button (`UserButton`) when the user is authenticated.
4. **SignedOut**: Shows a login button (`SignInButton`) for users who aren’t signed in, with post-authentication redirection to `/learn`.
