"use server";
import { connectToDatabase } from "./database";

export async function setSettingsOption(key: string, value: any) {
    const { db } = await connectToDatabase()
    await db.collection("settings").updateOne({ key }, { $set: { value } })
    return;
}
export async function getSettingsOption(key: string) {
    const { db } = await connectToDatabase()
    const res = await db.collection("settings").findOne({ key })
    if (!res) return null;
    //@ts-expect-error
    delete res._id;
    return res.value
}