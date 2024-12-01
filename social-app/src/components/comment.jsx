"use server";
import  { auth } from "@clerk/nextjs/server";
import { db } from "../utils/utilities"


export default async function CommentForm() {
    const { userId } = await auth();
    
    async function handleSubmit(formData) {
        "use server";
        const comment = formData.get("comment")
        await db.query(`INSERT INTO posts(clerk_id, content) VALUES($1, $2)`, [userId, comment])
    }
    
    return (
        <div>
            <form action={handleSubmit}>
                <input className="text-black" name="comment" placeholder="Write your comment here..."  />
                <button type="submit" >Submit</button>
            </form>
            
        </div>
        )

}
