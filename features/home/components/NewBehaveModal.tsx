import { useBehave } from "@/hooks/use-behave";
import { Island_Moments } from "next/font/google";
import { useState } from "react";

type Props = {
  setBehaveModal: (value: boolean) => void;
  setBehaveList: Function;
};

export function NewBehaveModal({ setBehaveModal, setBehaveList }: Props) {
  const [name, setName] = useState("");
  const { createBehaveFunction, isLoading } = useBehave();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) handleSave();
  };

  async function handleSave(){
              const newBehave = await createBehaveFunction(name);
              setName("");
              setBehaveList((prev: any) => [...prev, newBehave]);

  }
  return (
<div
  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  onClick={() => setBehaveModal(false)}
>
  <div
    className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-lg"
    onClick={(e) => e.stopPropagation()}
  >        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Novo comportamento
        </h2>

        <input
          type="text"
          placeholder="Nome do comportamento"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setBehaveModal(false)}
            className="px-4 py-2 rounded-lg bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-500 hover:dark:bg-zinc-500"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={isLoading || !name}
            className="px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-500 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {isLoading ? "Criando..." : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
}
