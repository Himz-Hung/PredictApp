import "./DeleteRecord.scss";
import useDeleteRecordHook from "./useDeleteRecordHook";

interface DeleteRecordProps {
  open: boolean;
  record: {
    recordId: string;
    games: string;
    date: string;
    sportType?: string;
  } | null;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
}

export default function DeleteRecord({
  open,
  record,
  onClose,
  onDelete,
}: DeleteRecordProps) {
  const { loading, handleConfirm } = useDeleteRecordHook();

  if (!open || !record) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={e => e.stopPropagation()}>
        <div className="delete-header">
          <h3>Delete Record</h3>
        </div>

        <div className="delete-body">
          {record && (
            <div className="delete-record-info">
              <p className="label">You are about to delete:</p>

              <div className="record-box">
                {record.sportType && (
                  <div className="sport">{record.sportType}</div>
                )}
                <div className="game">{record.games}</div>
                <div className="date">{record.date}</div>
              </div>

              <p className="warning">This action cannot be undone.</p>
            </div>
          )}
        </div>

        <div className="delete-footer">
          <button className="btn-cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>

          <button
            className="btn-delete"
            disabled={loading}
            onClick={() => handleConfirm(record.recordId, onDelete, onClose)}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
