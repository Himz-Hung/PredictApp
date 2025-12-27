import { useState } from "react";

export default function useDeleteRecordHook() {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (
    recordId: string,
    onDelete: (id: string) => Promise<void>,
    onClose: () => void
  ) => {
    try {
      setLoading(true);
      await onDelete(recordId);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleConfirm };
}
