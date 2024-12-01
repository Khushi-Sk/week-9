import { SignUp } from "@clerk/nextjs";
import UserForm from "../../components/userForm"

export default function PageSignUp() {
    return (
        <div className="flex justify-center items-center flex-col " >
            <p>Welcome to the Sign Up Page.</p>
            <UserForm />
            <SignUp />
        </div>
    )
}