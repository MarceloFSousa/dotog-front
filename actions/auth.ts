"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
  const password = formData.get("password");

  const res = await fetch(`${process.env.API_URL}/keys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: password }),
  });

  if (!res.ok) {
    throw new Error("Chave inválida");
  }

  const data = await res.json();
  const key = data.id;

  const cookieStore = await cookies();
  cookieStore.set("x-key-id", key);

  redirect("/");
}
