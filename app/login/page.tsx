// app/login/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    "use server";
      redirect("/");
    const password = formData.get("password");

    if (password === "100126") {
      const cookieStore = await cookies();
      cookieStore.set("site-auth", "true", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      redirect("/");
    }
  }

  return (
    <main className="p-8 text-center">
      <h1 className="bg-emerald-400 text-black text-xl w-1/4 mx-auto text-center rounded-lg py-2">
        Senha
      </h1>

      <form action={
      redirect("/")} className="flex flex-col items-center gap-4 mt-4">
        <input
          name="password"
          type="password"
          required
          className="
            w-full max-w-sm
            px-4 py-3
            bg-white
            text-black
            border border-black
            rounded-xl
            focus:outline-none
            focus:ring-2 focus:ring-black
          "
        />
        <button
          className="bg-black text-white hover:bg-amber-50 hover:text-black px-6 py-3 rounded-2xl transition"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
