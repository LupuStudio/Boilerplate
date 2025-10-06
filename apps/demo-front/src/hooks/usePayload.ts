"use server"
import { headers as getHeaders, cookies as getCookies } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const usePayload = async () => {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    return payload
}

// used to handle heavy queries with drizzle-orm
export const useRawPayload = async () => {
    return (await usePayload()).db.drizzle
}


export const useAuthPayload = async () => {
    const payload = await usePayload()
    const headers = await getHeaders()

    const { user } = await payload.auth({ headers })
    return { user, payload }
}

export const clearToken = async () => {
    const cookies = await getCookies()
    // 🧹 Clear the token cookie
    cookies.delete("payload-token")
}

export const updateToken = async (token: string) => {
    // await clearToken();

    const cookies = await getCookies()
    // 🔑 Save token as a secure HTTP-only cookie
    cookies.set("payload-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
}