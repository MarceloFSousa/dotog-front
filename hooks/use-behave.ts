'use client'
import { createBehave, deleteBehave } from "@/services/behaves.service";
import { useState } from "react";

export function useBehave() {
  const [isLoading, setIsLoading] = useState(false);

  async function createBehaveFunction(value: string) {
    try {
      setIsLoading(true);
      return await createBehave({name:value});
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBehaveFunction(id:string) {
    try{
    setIsLoading(true);
    return await deleteBehave(id);
    }
    finally{
      setIsLoading(false);
    }
  }

  return { createBehaveFunction, deleteBehaveFunction, isLoading };
}