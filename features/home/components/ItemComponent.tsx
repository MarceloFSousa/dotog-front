"use client";
import { useState } from "react";
import { useDonePercent } from "@/hooks/use-donepercent";
import { useItems } from "@/hooks/use-item";
import { Item } from "@/models/item";
import { CheckCircle2, Circle, X } from "lucide-react";
import { it } from "node:test";

export function ItemComponent({ item, setItemsList }: { item: Item; setItemsList: Function }) {
  const { donePercent, setPercent } = useDonePercent(item.donePercent);
  const { deleteItem, editItem, loading } = useItems();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isDone = donePercent === 100;

  async function toggleDone() {
    let newPerc = isDone ? 0 : 100;
    setPercent(newPerc);
    await editItem(item.id, {donePercent:newPerc});
  }

  async function handleBarClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    setPercent(percent);
    await editItem(item.id, {donePercent:percent});
  }

  async function handleDelete() {
    const result = await deleteItem(item.id);
    if (result !== null) {
      setItemsList((prev: Item[]) => prev.filter((i) => i.id !== item.id));
      setShowConfirm(false);
    }
  }

  return (
    <>
      <div
        className={`rounded-xl p-4 text-sm border shadow-sm transition-all
          ${
            isDone
              ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200"
              : "bg-zinc-50 border-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
          }`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={toggleDone}
            className="mt-1 transition-transform hover:scale-110"
          >
            {isDone ? (
              <CheckCircle2 className="text-emerald-500" size={20} />
            ) : (
              <Circle className="text-zinc-400 hover:text-blue-500" size={20} />
            )}
          </button>

          <div
            className="flex-1 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`font-medium ${isDone ? "line-through opacity-70" : ""}`}>
                {item.name}
              </span>
              <span className="text-xs font-semibold">{donePercent}%</span>
            </div>

            <div
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleBarClick(e);
              }}
            >
              <div
                className={`h-full transition-all duration-300 ${isDone ? "bg-emerald-500" : "bg-blue-500"}`}
                style={{ width: `${donePercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="mt-0.5 text-zinc-400 hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl w-80 flex flex-col gap-4 border border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-zinc-800 dark:text-zinc-100 font-medium">
              Tem certeza que deseja excluir <span className="font-semibold">"{item.name}"</span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 rounded-md p-2 text-sm border border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
              >
                {loading ? "Excluindo..." : "Excluir"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="flex-1 rounded-md p-2 text-sm border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl w-96 flex flex-col gap-4 border border-zinc-200 dark:border-zinc-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                {item.name}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              {item.description && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    Descrição
                  </span>
                  <p className="mt-1">{item.description}</p>
                </div>
              )}

              {item.datetimeToDo && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    Data para concluir
                  </span>
                  <p className="mt-1">
                    {new Date(item.datetimeToDo).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              )}

              <div>
                <span className="text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Progresso
                </span>
                <div className="mt-2 flex items-center gap-3">
                  <div
                    className="flex-1 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleBarClick}
                  >
                    <div
                      className={`h-full transition-all duration-300 ${isDone ? "bg-emerald-500" : "bg-blue-500"}`}
                      style={{ width: `${donePercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold">{donePercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}