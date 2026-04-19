import { logOff } from "@/services/api";

type Props = {
  setBehaveModal: (value: boolean) => void;
};

export function Navbar({ setBehaveModal }: Props) {
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-black shadow">
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-100">
                Do-Tog
            </h1>

            <div className="flex gap-3">
                <button
                    onClick={() => setBehaveModal(true)}
                    className="rounded-xl px-7 py-4 text-sm border shadow-sm transition-all
                    bg-emerald-900 border-emerald-700 text-white
                    hover:bg-emerald-800 hover:border-emerald-500 hover:shadow-md hover:scale-[1.02]
                    active:scale-[0.98]"
                    >
                    Novo comportamento
                    </button>

                    <button
                    onClick={logOff}
                    className="rounded-xl px-7 py-2 text-sm border shadow-sm transition-all
                    bg-pink-900 border-pink-700 text-white
                    hover:bg-pink-800 hover:border-pink-500 hover:shadow-md hover:scale-[1.02]
                    active:scale-[0.98]"
                    >
                    Sair
                    </button>
            </div>
        </div>
    )
}