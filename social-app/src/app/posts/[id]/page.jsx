import { auth } from "@clerk/nextjs/server"
import { db } from "@/utils/utilities"

export default async function SinglePost({params}){

    const { userId } = await auth()
    
    const responsePosts = await db.query(`SELECT posts.content, users.username, users.profile_pic, users.id as user_id 
        FROM posts JOIN users ON posts.clerk_id = users.clerk_id WHERE posts.id=${params.id}
        `)

        const posts = await responsePosts.rows
        console.log(posts)
        const responseUsers = (await db.query(`SELECT * FROM users WHERE clerk_id = '${userId}'`)).rows
        console.log(responseUsers)
    

    return (
        <div className="bg-neutral-50 pt-2 my-5 rounded-xl">
            <div>
                {posts.map( (post) => {
                    return (
                        
                    <div className="text-black bg-slate-50 w-96 my-5 py-2 px-4 text-black rounded border-b border-neurtral-300 " key={post.id}>
                
                    <div className="flex flex-row gap-2">
                        <img height={70} width={70}  src={post.profile_pic} />
                        <h3 className="pt-5 text-lg" >@{post.username} </h3>
                    </div>
                    
                
                    <div className="flex flex-col">
                    <h3 className="pl-20 w-96 pt-2 text-md" >{post.content}</h3>
                    </div>
                    <button className="pl-20 pt-5">
                        <img  width={18} src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png" />  
                    </button>
                    
                </div>
                    // <div className="text-black bg-slate-50 w-96 text-black rounded border-b border-neurtral-300 "  key={post.id}>
                        
                    //     <div className="flex flex-row gap-2">
                    //         <img height={70} width={70}  src={post.profile_pic} />
                    //         <h3 className="pt-5 text-lg" >@{post.username}</h3>
                    //     </div>

                    //     <div className="flex flex-col">
                    //         <h3 className="pl-20 w-96 pt-5 text-md" >{post.content}</h3>
                    //     </div>
                    //     <button className="pl-20 pt-5">
                    //         <img  width={18} src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png" />  
                    //     </button>
                    // </div>
                    )

                })}
            </div>
            
            
        </div>
    )
}