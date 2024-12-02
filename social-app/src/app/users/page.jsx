import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export default function UsersPage(){
    return (
        <>
        <div className="flex flex-col items-center justify-center h-[500px]">
            <h1 className="text-3xl">This is users page!</h1>
                <h2 className="text-xl">Please sign in</h2>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn> 
        </div>
            
        </>
        
    )
}