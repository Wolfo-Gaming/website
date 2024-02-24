
import LoginForm from "@/components/login/LoginForm";
import { connectToDatabase } from "@/lib/database";
import { BackgroundImage } from "@mantine/core";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function Login() {
    async function login(ctx: { email: string, password: string }) {
        "use server";
        const { db } = await connectToDatabase();
        const collection = db.collection("users");
        const document = await collection.findOne({
            email: ctx.email
        })
        if (!document) return false;

        const authorized = bcrypt.compareSync(ctx.password, document.password)
        if (!authorized) return false;

        return jwt.sign({ email: document.email }, process.env.APP_SECRET as string);
    }
    return (
        <BackgroundImage src="/img/login.jpg" h={"100%"} w={"100%"} display={"flex"}>
            <LoginForm onLogin={login} />
        </BackgroundImage>
    )
}