import { usePayload } from "@/hooks/usePayload";

export default async function UserIdPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const user = await (await usePayload()).findByID({
        collection: 'users',
        id,
    });

    return (
        <div>
            <h1>User ID Page</h1>
            <p>This is a dynamic route for user IDs.</p>
            <p>User ID: {id}</p>
            {user ? (
                <div>
                    <h2>User Details</h2>
                    <p>Email: {user.email}</p>
                    <p>ID: {user.id}</p>
                </div>
            ) : (
                <p>User not found.</p>
            )}
        </div>
    )
}