
"use client";

import { useState } from "react";
import CommentForm from "../comment";

export default function ClientComment(){

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(!show)
    return (
        <div className="bg-neutral-50 pt-2">
            <button onClick={handleShow} >
                <img  width={18} src="https://cdn-icons-png.flaticon.com/128/3114/3114810.png" />  
            </button>
            {show && <CommentForm />}
        </div>
    )
}