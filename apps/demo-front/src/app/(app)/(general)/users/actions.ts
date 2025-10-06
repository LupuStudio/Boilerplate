"use server"

import { useRawPayload } from "@/hooks/usePayload"
import { users } from "@/payload-generated-schema"
import { sql } from "@payloadcms/db-postgres"
import { redirect } from "next/navigation"

export async function createManyUsers() {

    const rawPayload = await useRawPayload()
    const newUsers = Array.from({ length: 5 }, (_, i) => ({
        email: `user${Date.now()}${i + Math.floor(Math.random() * 1000)
            }@example.com`,
        password: "password123",
    }))
    await rawPayload.insert(users).values(newUsers)
    redirect('/user')
}

export async function deleteAllUsers(formData: FormData) {

    const rawPayload = await useRawPayload()
    // delete where all email like '%@example.com'
    // but not '%admin% in the email
    const amount = formData.get("amount") ? parseInt(formData.get("amount") as string, 10) : 0
    if (amount > 0) {
        const usersToDelete = await rawPayload.select().from(users).where(sql`${users.email} LIKE '%@example.com' AND ${users.email} NOT LIKE '%admin%'`).limit(amount)
        const userIds = usersToDelete.map(user => user.id)
        await rawPayload.delete(users).where(sql`${users.id} IN (${sql.join(userIds, sql`,`)})`)
    }
    redirect('/user')
}