import Link from "next/link"

export default function NotFound() {
    return (
        <div>
            <h2>Page Not Found</h2>
            <p>Could not find requested post</p>
            <Link href="/" >Return to HomePage</Link>
        </div>
    )
}