import { useState } from "react";

export default function useMainTableHeaderHook() {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const state = { fromDate, toDate };

  const handler = { setFromDate, setToDate };

  return { state, handler };
}
