"use server";
import  { auth } from "@clerk/nextjs/server";
import { db } from "../utils/utilities"


export default async function ServerPost() {
    const { userId } = await auth();
    
    async function handleSubmit(formData) {
        "use server";
        const content = formData.get("content")
        // const username = formData.get("username")
        await db.query(`INSERT INTO posts(clerk_id, content) VALUES($1, $2)`, [userId, content])
    }
    
    return (
        <div>
            <form action={handleSubmit}>
                {/* <input name="username" placeholder="username" /> */}
                <textarea className="text-black" name="content" placeholder="Write your post here..." ></textarea>
                <button type="submit" >Submit</button>
            </form>
            
        </div>
        )

}