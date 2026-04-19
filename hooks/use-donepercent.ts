'use client'
import { useEffect, useState } from "react";

export function useDonePercent(defaultValue: number) {
  const [donePercent, setDonePercent] = useState(defaultValue);

  useEffect(() => {
    setDonePercent(defaultValue);
  }, [defaultValue]); 

  function setPercent(value: number) {
    setDonePercent(value);
  }

  return { donePercent, setPercent };
}