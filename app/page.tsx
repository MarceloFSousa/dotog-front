import Image from "next/image";
import { mockBehaves, mockItems } from "./mocks/mocks";
import { Behave } from "./models/behave";

export default function Home() {
  const behaves = mockBehaves
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black w-full">
      <h1 className="pt-6 pl-6 text-3xl font-semibold text-black dark:text-zinc-100 mb-8">
        Do-To
      </h1>

      <div className="overflow-x-auto ">
        <Columns behaves={mockBehaves} />
      </div>
    </div>
  );
}
function Columns({ behaves }: { behaves: Behave[] }) {
  return (
    <div className="flex w-full px-6 h-full gap-6 pb-6">
      {behaves.map((behave) => (
        <Column key={behave.id} behave={behave} />
      ))}
    </div>
  );
}
function Column({ behave }: { behave: Behave }) {
  const items = mockItems.filter(
    (item) => item.behaveId === behave.id
  );

  return (
    <div className="min-w-60 md:min-w-90 bg-white dark:bg-zinc-900 rounded-xl p-4 shadow h-full">
      <h2 className="font-semibold text-lg mb-4 capitalize">
        {behave.name}
      </h2>

      <div className="space-y-3">

        {Array.from({ length: Math.floor(Math.random() * 25) }).map((_, i) => (
          <Card
            key={i}
            title={`item ${i}`}
            done={false}
          />
        ))}

      </div>
    </div>
  );
}


function Card({ title, done = false }: { title: string; done?: boolean }) {
  return (
    <div
      className={`rounded-lg p-3 text-sm border ${done
        ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200"
        : "bg-zinc-50 border-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
        }`}
    >
      {title}
    </div>
  );
}
