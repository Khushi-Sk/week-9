
import { db } from "@/utils/utilities";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function UserForm() {
  const { userId } = await auth();
  console.log(userId);

  const pfp = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    

  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");
    const profile = formData.get("profile");

    db.query(
      `INSERT INTO users (username, bio, clerk_id, profile_pic) VALUES ($1, $2, $3, $4)`,
      [username, bio, userId, profile]
    );

    revalidatePath("/posts");
  }
  return (
    <form action={handleSubmit}>
      <input className="text-black" name="username" placeholder="Username" />
      <textarea className="text-black" name="bio" placeholder="Bio"></textarea>
      <input name="profile" defaultValue={pfp} type="hidden" /> 
      <button type="submit">Submit</button>
    </form>
  );
}