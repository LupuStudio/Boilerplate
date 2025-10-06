export type LoginState = {
    status: "idle" | "pending" | "success" | "error"
    message?: string
}