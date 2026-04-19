import { Item } from "@/models/item";
import { getBehavesByKey } from "@/services/behaves.service";
import { getItemsByBehave as getItemsByBehaveService, createItem as createItemService } from "@/services/items.service";

export async function getBehaves() {
    return await getBehavesByKey();
}
export async function getItemsByBehave(behaveId:string) {
    return await getItemsByBehaveService(behaveId);
}
export async function createItem(item:Item) {
    return await createItemService(item);
}