import { useState } from "react";
import { useItems } from "@/hooks/use-item";
import { Item } from "@/models/item";

interface Props {
  behaveId: string;
  setItemsList: Function;
}

export function NewItemComponent({ behaveId, setItemsList }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const { createItem, loading } = useItems();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) handleSave();
  };

  const handleSave = async () => {
    const item: Partial<Item> = {
      name,
      description,
      datetimeToDo: date ? new Date(date) : null,
      behaveId: behaveId,
      donePercent: 0,
    };

    const result = await createItem(item);
    item.id = result?.id;
    if (result) {
      setItemsList((prev: any) => [...prev, item]);
      setName("");
      setDescription("");
      setDate("");
      //setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setDate("");
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <div
        className="rounded-xl p-4 w-full text-sm border shadow-sm 
        bg-purple-50 border-purple-300 text-purple-900 
        dark:bg-purple-600/30 dark:text-purple-50 dark:border-purple-700"
      >
        <div className="flex flex-col gap-3">
          <div>
            <div className="pl-1 pb-1">Nome do item</div>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-2 rounded-md w-full dark:bg-black/30"
            />
          </div>
          <div>
            <div className="pl-1 pb-1">Descrição do item</div>
            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-2 rounded-md w-full dark:bg-black/30"
            />
          </div>
          <div>
            <div className="pl-1 pb-1">Data para concluir</div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-2 rounded-md w-full dark:bg-black/30"
            />
          </div>

          <div className="flex gap-2">
            <button
              className="flex-1 border rounded-md p-2 bg-black/50 border-blue-500 disabled:opacity-50"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar"}
            </button>

            <button
              className="flex-1 border rounded-md p-2 bg-black/50 border-red-500 disabled:opacity-50"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="rounded-xl p-4 w-full text-sm border shadow-sm transition-all 
      bg-purple-50 border-purple-300 text-purple-900 
      hover:bg-purple-100 hover:border-purple-400 hover:shadow-md
      dark:bg-purple-600/30 dark:text-purple-50 dark:border-purple-700 
      dark:hover:bg-purple-900/50"
    >
      + Novo Item
    </button>
  );
}
