# Duolingo clone using Nextjs,Drizzle and Stripe
```bash
git clone https://github.com/yourSrijit/Duolingo-Clone-With-Nextjs-Drizzle-Stripe.git

cd Duolingo-Clone-With-Nextjs-Drizzle-Stripe

npm install
npm run dev
```










https://d35aaqx5ub95lt.cloudfront.net/favicon.ico icon











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
