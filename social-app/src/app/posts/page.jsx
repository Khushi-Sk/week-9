import { db } from "@/utils/utilities"
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignedOut , SignedIn } from "@clerk/nextjs";
import PostForm from "../../components/postForm";
import  UserForm from "../../components/userForm";


export default async function PostPage(){

    const { userId } = await auth()
    
    const responsePosts = await db.query(`SELECT 
        posts.id, posts.content, users.username, users.profile_pic, users.id as user_id FROM posts JOIN users ON posts.clerk_id = users.clerk_id`)

        const posts = await responsePosts.rows

        const responseUsers = await db.query(`SELECT * FROM users WHERE clerk_id = '${userId}'`)
        const  numUsers = await responseUsers.rowCount;

    return (
        <div>
            <div className="flex justify-center flex-col w-[600px] bg-neutral-900 p-5 my-5 rounded-xl text-lg">
            <h1>This is Posts page!</h1>
            <SignedIn>{numUsers === 1 ? 
                <div className="flex justify-center flex-col items-center" >
                 <p>Signed In Post Page</p> <PostForm />
                 </div> : 
                 <div>
                    <p>Signed In Users Page</p>
                    <UserForm />
                    </div>  }</SignedIn>
            <SignedOut>
                <Link href={"/sign-in"} > Sign In </Link>
            </SignedOut>

            </div>
            

    <div className="flex flex-col w-[600px] justify-center items-center bg-neutral-900 py-5 rounded-xl">
          {posts.map((post) => {
            return(
                <div className="text-black bg-slate-50 w-96 my-5 py-5 px-4 text-black rounded border-b border-neurtral-300 " key={post.id}>
                    
                    <Link href={`/users/${post.id}`}>
                        <div className="flex flex-row gap-2">
                            <img height={70} width={70}  src={post.profile_pic} />
                            <h3 className="pt-5 text-lg" >@{post.username} </h3>
                        </div>
                    </Link>
                        
                    
                    <Link  href={`/posts/${post.id}`}>
                        <div className="flex flex-col">
                        <h3 className="pl-20 w-96 pt-2 text-md" >{post.content}</h3>
                        </div>
                        <button className="pl-20 pt-5">
                            <img  width={18} src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png" />  
                        </button>
                    </Link>
                </div>
            )
            })}
            </div>
        </div>
        
    )
}