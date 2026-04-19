// app/login/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    "use server";

    const password = formData.get("password");

    const res = await fetch("http://localhost:4575/keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: password }),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const data = await res.json();
    const key = data.id;

    const cookieStore = await cookies();
    cookieStore.set("x-key-id", key);

    redirect("/");
  }
  return (
    <main className="text-center min-h-screen bg-zinc-50 dark:bg-black w-full">
      <div className="flex items-center justify-between px-6 py-4 shadow">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-100 py-4">
          Do-Tog
        </h1>
      </div>
      <h1 className=" text-emerald-400 text-xl w-1/4 mx-auto text-center py-2">
        Digite sua senha:
      </h1>

      <form
        action={handleLogin}
        className="flex justify-center items-center gap-2 mt-4"
      >
        <input
          name="password"
          type="password"
          required
          className="
            w-full max-w-sm
            px-4 py-3
            bg-white
            text-black
            border border-emerald-400
            rounded-2xl
            focus:outline-none
            focus:ring-2 focus:ring-black
          "
        />
        <button
          className="bg-emerald-800 text-white hover:bg-emerald-300 hover:text-black px-7 py-3 rounded-2xl transition"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
