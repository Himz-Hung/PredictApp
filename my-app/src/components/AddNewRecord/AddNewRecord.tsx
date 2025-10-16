import type { GameRecordData } from "../../models/mainTableModels";
import useAddNewRecordHook from "./useAddNewRecordHook";

interface AddNewRecordProps {
  gameRecordData?: GameRecordData;
  isOpenRecord: { id: string; action: "add" | "edit" | "view" | "close" };
  setIsOpenRecord: React.Dispatch<
    React.SetStateAction<{
      id: string;
      action: "add" | "edit" | "view" | "close";
    }>
  >;
}

export default function AddNewRecord({
  gameRecordData,
  setIsOpenRecord,
  isOpenRecord = { id: "", action: "add" },
}: AddNewRecordProps) {
  const { state, handler } = useAddNewRecordHook(
    setIsOpenRecord,
    gameRecordData
  );
  const {
    isOpen,
    isClosing,
    isSaving,
    gameOptions,
    errors,
    gameOptionsStatus,
    getValues,
  } = state;
  const { setIsOpen, closeModal, handleSubmit, register, reset } = handler;

  return (
    <div>
      {/* --- Button mở popup --- */}
      <button
        onClick={() => {
          setIsOpen(true);
          reset();
        }}
        className="flex items-center text-green-400 border border-green-400 
          bg-transparent font-medium rounded-xl text-sm px-5 py-2.5 text-center 
          shadow-none transition-all duration-300 ease-out 
          hover:text-white hover:bg-green-400/20 hover:border-green-500
          hover:shadow-lg hover:shadow-green-500/30
          hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Record
      </button>

      {/* --- Popup Modal --- */}
      {(isOpen ||
        isOpenRecord.action === "view" ||
        isOpenRecord.action === "edit") && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center
              bg-black/50 backdrop-blur-sm transition-opacity duration-300
              pt-[env(safe-area-inset-top)]
              ${isClosing ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className={`bg-gray-900 text-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 
                transform transition-all duration-300 max-h-[75vh] overflow-y-auto
                ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
          >
            <h2 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400">
              {isOpenRecord.action === "add"
                ? "Add New Record"
                : isOpenRecord.action === "edit"
                ? "Edit Record"
                : "View Record"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-center flex-wrap">
                {/* --- Sport Type --- */}
                <div className="w-full sm:w-48">
                  <label className="block mb-1 text-sm text-gray-300">
                    Sport Type
                  </label>
                  <select
                    {...register("sportType", {
                      required: "Please select a sport",
                    })}
                    className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none transition"
                  >
                    <option value="">Select sport...</option>
                    <option value="nba-basketball">NBA-Basketball</option>
                    <option value="nfl-football">NFL-Football</option>
                    <option value="nhl-hockey">NHL-Hockey</option>
                    <option value="mlb-baseball">MLB-Baseball</option>
                    <option value="ncaa-basketbal">NCAA-Basketball</option>
                  </select>
                  {errors.sportType && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.sportType.message}
                    </p>
                  )}
                </div>

                {/* --- Date & Time --- */}
                <div className="w-full sm:w-48 mt-4 sm:mt-0">
                  <label className="block mb-1 text-sm text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register("dateTime", {
                      required: "Please select date",
                    })}
                    className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none transition"
                  />
                  {errors.dateTime && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.dateTime.message}
                    </p>
                  )}
                </div>
              </div>
              {/* --- Game --- */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">Game</label>
                <select
                  {...register("game", {
                    required: "Please select a game",
                    validate: value =>
                      !["2", "3", "4"].includes(value) ||
                      "Please select a game",
                  })}
                  className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none transition disabled:opacity-50"
                  disabled={
                    !gameOptions.length ||
                    ["2", "3", "4"].includes(gameOptionsStatus.value)
                  }
                >
                  {gameOptionsStatus.value && (
                    <option value={gameOptionsStatus.value}>
                      {gameOptionsStatus.label}
                    </option>
                  )}
                  {!gameOptions.length && (
                    <option value="">Select sport and date first</option>
                  )}
                  {gameOptions.map((g, index) => (
                    <option key={index} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {errors.game &&
                  ["2", "3", "4", ""].includes(getValues("game")) && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.game.message}
                    </p>
                  )}
              </div>

              {/* --- Predict Value --- */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Predict Value
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="^-?\d+(\.\d+)?$"
                  {...register("predictValue", {
                    required: "Enter a value",
                    pattern: {
                      value: /^-?\d+(\.\d+)?$/,
                      message: "Enter a valid number",
                    },
                  })}
                  onKeyDown={e => {
                    const allowed = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Enter",
                    ];
                    if (allowed.includes(e.key)) return;
                    const target = e.currentTarget as HTMLInputElement;
                    // allow one dot and optional leading minus
                    if (e.key === ".") {
                      if (target.value.includes(".")) e.preventDefault();
                      return;
                    }
                    if (e.key === "-") {
                      if (
                        target.selectionStart !== 0 ||
                        target.value.includes("-")
                      )
                        e.preventDefault();
                      return;
                    }
                    if (!/\d/.test(e.key)) e.preventDefault();
                  }}
                  className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none transition"
                  placeholder="Enter value..."
                />
                {errors.predictValue && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.predictValue.message}
                  </p>
                )}
              </div>

              {/* --- Result --- */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Result
                </label>
                <select
                  {...register("result", { required: "Please select result" })}
                  className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none transition"
                >
                  <option value="">Select result...</option>
                  <option value="WIN">Win</option>
                  <option value="LOSE">Lose</option>
                  <option value="DRAW">Draw</option>
                  <option value="CANCEL">Cancel</option>
                  <option value="PENDING">Pending</option>
                </select>
                {errors.result && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.result.message}
                  </p>
                )}
              </div>

              {/* --- Profit --- */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Profit
                </label>
                <input
                  type="number"
                  {...register("profit", {
                    required: "Enter profit value",
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none transition"
                  placeholder="Enter profit..."
                />
                {errors.profit && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.profit.message}
                  </p>
                )}
              </div>

              {/* --- Buttons --- */}
              <div className="flex justify-end gap-3 mt-6">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300
               bg-transparent
               transition-all duration-300 ease-out
               hover:bg-gray-800 hover:text-white hover:border-gray-400
               hover:shadow-lg hover:shadow-gray-700/40
               hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
                >
                  Cancel
                </button>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-5 py-2 rounded-lg font-semibold flex items-center justify-center
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                text-white transition-all duration-300 ease-out
                hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400
                hover:shadow-lg hover:shadow-pink-500/30
                hover:scale-[1.03] active:scale-[0.98]
                disabled:opacity-80 disabled:cursor-wait hover:cursor-pointer`}
                >
                  {isSaving ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
