'use client'

import { Behave } from "@/models/behave";
import { Item } from "@/models/item";
import Columns from "./Columns";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { NewBehaveModal } from "./NewBehaveModal";
export default function HomePage({
  behaves,
  items,
}: {
  behaves: Behave[];
  items: Item[];
}) {
  const [openModal, setOpenModal] = useState(false);
  const [behavesList, setBehaveList]=useState(behaves);
  const [itemsList, setItemsList]=useState(items);
  const [showDoneItems, setShowDoneItems]=useState(true);

  function setBehaveModalHandler(visible:boolean):void{
    setOpenModal(visible);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black w-full">

      <Navbar setBehaveModal={setBehaveModalHandler} showDoneItems={showDoneItems} setShowDoneItems={setShowDoneItems}/>
      <div className="overflow-x-auto pt-4">
        <Columns behaves={behavesList} items={itemsList} setItemsList={setItemsList} setBehaveList={setBehaveList} showDoneItems={showDoneItems}/>
      </div>

      {openModal && (
        <NewBehaveModal setBehaveModal={setBehaveModalHandler} setBehaveList={setBehaveList}/>
      )}
    </div>
  )
}
;
