"use server";

import { Behave } from "@/models/behave";
import { cookies } from "next/headers";

const BASE_URL = "http://localhost:4575";

async function getToken(): Promise<string> {
  const cookiesBrowser = await cookies();
  return cookiesBrowser.get("x-key-id")?.value || "";
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-key-id": token,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    console.error("STATUS:", res.status);
    throw new Error("Backend error");
  }

  return res.json();
}

export async function createBehave(behave: Partial<Behave>): Promise<Behave> {
  return request("/behaves", {
    method: "POST",
    body: JSON.stringify({
      ...behave
    }),
  });
}

export async function getBehave(id: string): Promise<Behave> {
  return request(`/behaves/${id}`);
}
export async function getBehavesByKey(): Promise<Behave[]> {
  const keyId = await getToken();
  return request(`/behaves/key/${keyId}`);
}

export async function editBehave(id: string, item: Partial<Behave>): Promise<Behave> {
  return request(`/behaves/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
  });
}

export async function deleteBehave(id: string): Promise<void> {
  return request(`/behaves/${id}`, { method: "DELETE" });
}