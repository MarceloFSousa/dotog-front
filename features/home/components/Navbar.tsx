import { Eye, EyeOff } from "lucide-react";
import { logOff } from "@/services/api";
import { Item } from "@/models/item";

type Props = {
  setBehaveModal: (value: boolean) => void;
  showDoneItems: boolean;
  setShowDoneItems: (value: boolean) => void;
};

export function Navbar({ setBehaveModal, showDoneItems, setShowDoneItems }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-black shadow">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-100">
        Do-Tog
      </h1>

      <div className="flex gap-3 items-center">

        {/* BOTÃO OLHO */}
        <button
          onClick={() => {setShowDoneItems(!showDoneItems);
            console.log(`show: ${showDoneItems}`);}}
          title={showDoneItems ? "Ocultar itens feitos" : "Mostrar itens feitos"}
          className="p-3 rounded-xl border shadow-sm transition-all
          bg-amber-500 border-amber-700 text-white
          hover:bg-amber-600 hover:scale-105 active:scale-95"
        >
          {showDoneItems ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {/* NOVO COMPORTAMENTO */}
        <button
          onClick={() => setBehaveModal(true)}
          className="rounded-xl px-5 py-3 text-sm border shadow-sm transition-all
          bg-emerald-900 border-emerald-700 text-white
          hover:bg-emerald-800 hover:shadow-md hover:scale-[1.02]
          active:scale-[0.98]"
        >
          Novo comportamento
        </button>

        {/* SAIR */}
        <button
          onClick={logOff}
          className="rounded-xl px-5 py-3 text-sm border shadow-sm transition-all
          bg-pink-900 border-pink-700 text-white
          hover:bg-pink-800 hover:shadow-md hover:scale-[1.02]
          active:scale-[0.98]"
        >
          Sair
        </button>
      </div>
    </div>
  );
}