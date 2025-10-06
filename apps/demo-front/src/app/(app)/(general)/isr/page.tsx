import { usePayload } from "@/hooks/usePayload"
import { revalidatePath } from "next/cache"

// nextjs config
export const dynamic = "force-static"
export const revalidate = 86400 // revalidate every 24 hours (ISR)

export default async function IncrementalStaticGenerationPage() {

    const payload = await usePayload()
    const { docs: Users } = await payload.find({
        collection: 'users',
        limit: 10,
    })

    // You can revalidate the page from a server action
    async function revalidate() {
        "use server"
        revalidatePath('/isr')
    }

    return (
        <div>
            <h1>This is a Incremental Static Generation page</h1>
            <p>The content of this page is cached for better performance.</p>

            <h2>Users</h2>
            <ul>
                {Users.map(user => (
                    <li key={user.id}>{user.email}</li>
                ))}
            </ul>

            <button onClick={revalidate}>Revalidate Page</button>
        </div>
    )
}