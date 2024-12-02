import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import DialogDemo from "./editBio"
import { SignedOut , SignedIn } from "@clerk/nextjs";
import PostForm from "../../../components/postForm";
import  UserForm from "../../../components/userForm";
import Link from "next/link";


export default async function UserPage() {

  const { userId } = await auth()

  const response = await db.query(`SELECT posts.id, posts.content, users.username, users.bio, users.id as user_id FROM posts JOIN users ON posts.clerk_id = users.clerk_id`
    
  )
  const users = response.rows
  const bio = users[0].bio
  const username_ = users[0].username

  const responseUsers = await db.query(`SELECT * FROM users WHERE clerk_id = '${userId}'`)
  const  numUsers = await responseUsers.rowCount;
    return (
      <div >

            <SignedIn>{numUsers === 1 ? "yes-yes"
                : 
                 "no-no"} <h2>Edit User Details:</h2>
        <div className="py-10 ">
          <DialogDemo bio={bio} username={username_} userId={userId} />
         
        </div>
        <div className="flex flex-col w-[600px] justify-center items-center bg-neutral-900 py-5 rounded-xl">
          {users.map((user) => {
            return(
              <div className="text-black bg-slate-50 w-96 my-5 py-5 px-4 text-black rounded border-b border-neurtral-300 " key={user.id}>
                  <div className="flex flex-row gap-2">
                      <img height={70} width={70}  src={user.profile_pic} />
                      <h3 className="pt-5 text-lg" >@{user.username} </h3>
                  </div>

                  <div className="flex flex-col">
                      <h3 className="pl-20 w-96 pt-2 text-md" >{user.content}</h3>
                  </div>
                  <button className="pl-20 pt-5">
                      <img  width={18} src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png" />  
                  </button>
              </div>
            )
          }
          )}
        </div>
            </SignedIn>

            <SignedOut>
                <Link href={"/sign-in"} > Sign In </Link>
            </SignedOut>

       
      </div>
    );
  }