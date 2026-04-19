"use server";

import { Item } from "@/models/item";
import { cookies } from "next/headers";

const BASE_URL = process.env.API_URL;

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

export async function createItem(item: Partial<Item>): Promise<Item> {
  return request("/items", {
    method: "POST",
    body: JSON.stringify({
      ...item,
      datetimeToDo: item.datetimeToDo ? item.datetimeToDo.toISOString() : null,
    }),
  });
}

export async function getItemsByBehave(behaveId: string): Promise<Item[]> {
  return request(`/items/behave/${behaveId}`);
}

export async function getItem(id: string): Promise<Item> {
  return request(`/items/${id}`);
}

export async function editItem(id: string, item: Partial<Item>): Promise<Item> {
  return request(`/items/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id: string): Promise<void> {
  return request(`/items/${id}`, { method: "DELETE" });
}