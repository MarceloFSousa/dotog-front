import HomePage from "@/features/home/components/HomePage";
import { getBehaves, getItemsByBehave } from "@/actions/actions";
import { Item } from "@/models/item";

export default async function Home() {
      const behaves = await getBehaves();

      const items = [];
      for (const b of behaves) {
            const result = await getItemsByBehave(b.id);
            items.push(result);
      }


      return (
            <HomePage behaves={behaves} items={items.flat()} />)
}
