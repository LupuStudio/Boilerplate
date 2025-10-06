import { useAuthPayload } from "@/hooks/usePayload"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    // Check authentication
    // If not authenticated, redirect to login
    const { user } = await useAuthPayload()
    if (!user) redirect('/login')

    // If authenticated, render protected page
    return children
}