import { useRawPayload } from "@/hooks/usePayload"
import { users } from "@/payload-generated-schema"
import { createManyUsers, deleteAllUsers } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default async function UsersPage() {

    const rawPayload = await useRawPayload()
    const usersData = await rawPayload.select().from(users).limit(10)

    return (
        <div>
            <h1>Users Page</h1>
            {usersData.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <ul>
                    {usersData.map(user => (

                        <li key={user.id}>
                            <Link href={'/user/' + user.id}>{user.email}</Link>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex gap-2 mt-4">
                <form action={createManyUsers}>
                    <Button >Create 5 Users</Button>
                </form>
                <form action={deleteAllUsers}>
                    <div className="flex gap-2">
                        <div>
                            <Input name="amount" placeholder="amount" type="number"></Input>
                        </div>
                        <Button variant="destructive">Delete All Users</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}   