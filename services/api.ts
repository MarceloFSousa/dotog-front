'use server'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


 export const logOff = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("x-key-id");

    redirect("/login");
  };