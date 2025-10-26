import { useState } from "react";

export default function useMainTableHeaderHook() {
  const [fromDate, setFromDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 10))
  );
  const [toDate, setToDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const state = { fromDate, toDate, isLoading };
  const handler = {
    setFromDate,
    setToDate,
    setIsLoading,
  };

  return { state, handler };
}
