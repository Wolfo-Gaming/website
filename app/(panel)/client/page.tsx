import getUser from "@/lib/session";
export const metadata = {
  title: "Dashboard"
}
export default async function Home() {
  const user = await getUser()

  return (
    <>{user.email}</>
  );
}
