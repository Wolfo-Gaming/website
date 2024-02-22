"use server";
import { redirect as redir } from 'next/navigation';

export default async function redirect(path: string) {
    return redir(path);
}