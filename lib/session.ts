"use server";
import { User } from "@/types/User";
import jwt, { JwtPayload, NotBeforeError } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { connectToDatabase } from "./database";
import { NextRequest } from "next/server";

export async function updateUser(email: string, user: User) {
    const { db } = await connectToDatabase();
    const n = await db.collection("users").findOne({ email })
    if (!n) throw new Error("User not found");
    return db.collection("users").updateOne({ email }, { "$set": { ...user } })
}
export async function getToken(user: User) {
    //@ts-expect-error
    delete user._id;
    //@ts-expect-error
    delete user.password;
    return jwt.sign(user, process.env.APP_SECRET as string);
}
export default async function getUser(): Promise<User> {
    const cookieStore = cookies()
    const valid = cookieStore.get("auth_token")
    if (!valid) return redirect("/auth/login");
    try {
        var res = jwt.verify(valid.value, process.env.APP_SECRET as string) as JwtPayload;
        if (!res) return redirect("/auth/login");
        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: res.email });
        if (!user) return redirect("/auth/login");
        //@ts-expect-error
        delete user._id;
        delete user.password;
        // @ts-expect-error
        return user;
    } catch (error) {
        return redirect("/auth/login");
    }
}
export async function getUserOptional(): Promise<User | null> {
    const cookieStore = cookies()
    const valid = cookieStore.get("auth_token")
    if (!valid) return null;
    try {
        var res = jwt.verify(valid.value, process.env.APP_SECRET as string) as JwtPayload;
        if (!res) return null;
        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: res.email });
        if (!user) return null;
        //@ts-expect-error
        delete user._id;
        delete user.password;
        // @ts-expect-error
        return user;
    } catch (error) {
        return null;
    }
}
export async function isAuthorized(req: NextRequest) {
    const valid = req.cookies.get("auth_token")
    if (!valid) return false;
    try {
        var res = jwt.verify(valid.value, process.env.APP_SECRET as string) as JwtPayload;
        if (!res) return false;
        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: res.email });
        if (!user) return false;
        return true;
    } catch (error) {
        return false;
    }
}
export async function logout() {
    const cookieStore = cookies()
    cookieStore.delete("auth_token");
    redirect("/auth/login")
}