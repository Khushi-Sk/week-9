import React from "react";

import { db } from "@/utils/utilities";
import { revalidatePath } from "next/cache";

export default async function UserForm({userId} ) {
//   const { userId } = await auth();
//   console.log(userId);
  async function handleSubmit(formData) {
    "use server";
    const username = formData.get('username');
    const bio = formData.get('bio');

    const response = await db.query( `UPDATE users SET username=$1, bio=$2 WHERE clerk_id='${userId}'`, [username, bio] );

    console.log(response.rows)
    revalidatePath(`/users/${userId}`);
  }
 return (
    <form action={handleSubmit} className="bg-neutral-900 p-5 rounded-xl">
                    
        <fieldset className="mb-[15px] flex items-center gap-5 bg-black">
            <label
                className="w-[70px] text-right text-[15px] text-violet11"
                htmlFor="name"
            >Name :
            </label>
            <input
                className="inline-flex bg-black h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                id="name" name={'username'} placeholder="Username" />
        </fieldset>
    

        <fieldset className="mb-[15px] flex items-center gap-5 bg-black">
            <label
                className="w-[70px] bg-black text-right text-[15px] text-violet11"
                htmlFor="username"
            >Bio :
            </label>
            <input
                className="inline-flex bg-black h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                id="username" placeholder="Bio..." name={'bio'} />
        </fieldset>

        <button className="border-white border p-2 rounded" type="submit" >Update</button>

                    
        </form>
);

}
