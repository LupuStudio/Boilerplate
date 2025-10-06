import { checkRole } from "@/payload/access/utilities"
import { clearToken, useAuthPayload } from "@/hooks/usePayload"
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default async function AdminHeader() {

    const { user } = await useAuthPayload()
    if (!checkRole(['admin'], user)) return null;

    async function HandleLogoutFormButton(formData: FormData) {
        "use server"
        await clearToken()
        redirect('/')
    }

    return (
        <header className="bg-gray-500 flex justify-between px-2">
            <Link href="/admin" className="text-sm underline">{user?.email}</Link>
            <form action={HandleLogoutFormButton}>
                <Button size={"sm"}>Logout</Button>
            </form>
        </header>
    )
}