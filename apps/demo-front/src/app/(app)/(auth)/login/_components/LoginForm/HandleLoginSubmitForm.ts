"use server"

import { updateToken, usePayload } from "@/hooks/usePayload"
import { LoginState } from "./types"

export async function HandleLoginSubmitForm(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {

    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if (!email || !password) {
        return { status: "error", message: "Missing credentials" }
    }
    const { login } = await usePayload()
    const { user, token } = await login({ collection: "users", data: { email, password } })

    if (!user || !token) {
        return { status: "error", message: "Invalid credentials" }
    }
    await updateToken(token)
    return { status: "success", message: "Logged in!" }

}