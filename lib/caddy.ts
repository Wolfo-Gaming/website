"use server";
import axios from "axios";
export async function getConfig(): Promise<any> {
    const result = await axios.get("/config/", {
        baseURL: process.env.CADDY_HOST
    })
    return result.data;
}
export async function putConfig(config: any): Promise<any> {
    const result = await axios.post("/load", config, {
        baseURL: process.env.CADDY_HOST,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return result.data;

}