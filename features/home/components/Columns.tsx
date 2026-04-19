import { Behave } from "@/models/behave";
import { Item } from "@/models/item";
import Column from "./Column";

export default function Columns({ behaves, items, setItemsList, setBehaveList }: { behaves: Behave[], items: Item[], setItemsList: Function, setBehaveList: Function }) {
  return (
    <div className="flex w-full px-6 h-full gap-6 pb-6">
      {behaves.map((behave) => (
        <Column key={behave.id} behave={behave} items={items} setItemsList={setItemsList} setBehaveList={setBehaveList} />
      ))}
    </div>
  );
}