'use client'

import { useLogin } from "@/hooks/use-login";

export default function LoginPage() {
  const { handleLogin } = useLogin();

  return (
    <main className="min-h-screen bg-zinc-100 dark:bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-500">Do-Tog</h1>
          <p className="text-zinc-500 text-sm mt-2">
            Acesse sua conta usando sua chave
          </p>
        </div>

        <div className="bg-emerald-50 dark:bg-zinc-800 border border-emerald-200 dark:border-zinc-700 rounded-xl p-4 text-sm text-zinc-600 dark:text-zinc-300">
          <p>
            <strong>O que é a chave de acesso?</strong>
          </p>
          <p className="mt-1">
            É um código único que identifica você no sistema.
            Em vez de usuário e senha, você usa essa chave para entrar com segurança.
          </p>
        </div>

        <form action={handleLogin} className="flex flex-col gap-4">
          <input
            name="password"
            type="password"
            required
            placeholder="Digite sua chave..."
            className="
              w-full
              px-4 py-3
              bg-zinc-100 dark:bg-zinc-800
              text-black dark:text-white
              border border-emerald-400
              rounded-xl
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500
            "
          />

          <button
            type="submit"
            className="
              bg-emerald-600
              text-white
              hover:bg-emerald-400
              hover:text-black
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Entrar
          </button>
        </form>

        <p className="text-xs text-center text-zinc-400">
          Não compartilhe sua chave com ninguém
        </p>
      </div>
    </main>
  );
}
