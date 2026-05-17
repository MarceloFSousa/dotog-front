import { Behave } from "@/models/behave";
import { Item } from "@/models/item";
import { ItemComponent } from "./ItemComponent";
import { NewItemComponent } from "./NewItemComponent";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useBehave } from "@/hooks/use-behave";
import { it } from "node:test";

export default function Column({
  behave,
  items,
  setItemsList,
  setBehaveList,
  showDoneItems
}: {
  behave: Behave;
  items: Item[];
  setItemsList: Function;
  setBehaveList: Function;
  showDoneItems:boolean
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoading, deleteBehaveFunction } = useBehave();
  async function handleDelete() {
    const result = await deleteBehaveFunction(behave.id);
    if (result !== null) {
      setBehaveList((prev: Behave[]) => prev.filter((i) => i.id !== behave.id));
      setShowConfirm(false);
    }
  }
const visibleItems = useMemo(
  () => items.filter((item) => item.behaveId === behave.id && (item.donePercent < 100 || showDoneItems)),
  [items, behave.id, showDoneItems]
);


  return (
    <div className="min-w-60 md:min-w-90 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow h-full">
      <div className="flex justify-between align-middle">
        <h2 className="font-semibold text-lg mb-4 capitalize">{behave.name}</h2>
        <button
          onClick={() => setShowConfirm(true)}
          className="mb-4 text-zinc-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <NewItemComponent behaveId={behave.id} setItemsList={setItemsList} />
      <div className="mt-3 space-y-3">
        {visibleItems.map((item) => (
            <ItemComponent
              key={item.id}
              item={item}
              setItemsList={setItemsList}
            />
          ))}
      </div>
      {/* Delete confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl w-80 flex flex-col gap-4 border border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-zinc-800 dark:text-zinc-100 font-medium">
              Tem certeza que deseja excluir{" "}
              <span className="font-semibold">"{behave.name}"</span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 rounded-md p-2 text-sm border border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
              >
                {isLoading ? "Excluindo..." : "Excluir"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isLoading}
                className="flex-1 rounded-md p-2 text-sm border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
