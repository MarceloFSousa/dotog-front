import { useState, useCallback } from "react";
import { Item } from "@/models/item";
import {
  createItem,
  getItemsByBehave,
  getItem,
  editItem,
  deleteItem,
} from "@/services/items.service";

type State<T> = { data: T | null; loading: boolean; error: string | null };

export function useItems() {
  const [state, setState] = useState<State<unknown>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Unknown error";
      setState({ data: null, loading: false, error });
      return null;
    }
  }, []);

  return {
    ...state,
    getItemsByBehave: useCallback((behaveId: string) =>
      execute<Item[]>(() => getItemsByBehave(behaveId)), [execute]),

    getItem: useCallback((id: string) =>
      execute<Item>(() => getItem(id)), [execute]),

    createItem: useCallback((item: Partial<Item>) =>
      execute<Item>(() => createItem(item)), [execute]),

    editItem: useCallback((id: string, item: Partial<Item>) =>
      execute<Item>(() => editItem(id, item)), [execute]),

    deleteItem: useCallback((id: string) =>
      execute<void>(() => deleteItem(id)), [execute]),
  };
}