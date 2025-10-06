"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { LoginState } from "./types"
import { HandleLoginSubmitForm } from "./HandleLoginSubmitForm"


export function LoginForm() {

    const [state, formAction, isPending] = useActionState<LoginState, FormData>(
        HandleLoginSubmitForm,
        { status: "idle" }
    )

    // Mostrar toast automaticamente quando status mudar
    useEffect(() => {
        if (state.status === "error") {
            toast.error("Login failed", {
                description: state.message ?? "Please check your credentials",
            })
        }
        if (state.status === "success") {
            toast.success("Success!", {
                description: state.message ?? "Redirecting...",
            })
            // exemplo: redirecionar após 1s
            setTimeout(() => redirect("/"), 1000)
        }
    }, [state, toast])

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
