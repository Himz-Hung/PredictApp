import { Controller } from "react-hook-form";
import type { GameStatusType } from "../../models/gameStatusEnum";
import type { GameRecordData } from "../../models/mainTableModels";
import CustomSelectField from "../CustomComponent/CustomSelectField/CustomSelectField";
import DatePickerCustom from "../CustomComponent/DatePickerCustom/DatePickerCustom";
import useAddNewRecordHook from "./useAddNewRecordHook";
import "./AddNewRecord.scss";
interface AddNewRecordProps {
  sportTypeDefault?: string;
  gameRecordData?: GameRecordData;
  onchangeSportType?: (sportType: string) => void;
  isOpenRecord: { id: string; action: "add" | "edit" | "view" | "close" };
  setIsOpenRecord: React.Dispatch<
    React.SetStateAction<{
      id: string;
      action: "add" | "edit" | "view" | "close";
    }>
  >;
}

export default function AddNewRecord({
  sportTypeDefault,
  gameRecordData,
  setIsOpenRecord,
  onchangeSportType,
  isOpenRecord = { id: "", action: "add" },
}: AddNewRecordProps) {
  const { state, handler } = useAddNewRecordHook(
    setIsOpenRecord,
    onchangeSportType,
    gameRecordData,
    isOpenRecord,
    sportTypeDefault
  );

  const {
    isOpen,
    isClosing,
    isSaving,
    gameOptions,
    errors,
    gameOptionsStatus,
    sportOptions,
  } = state;

  const {
    setIsOpen,
    closeModal,
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    control,
  } = handler;

  return (
    <div>
      <button
        onClick={() => {
          reset();
          setIsOpenRecord({ id: "", action: "add" });
          setValue("sportType", sportTypeDefault ? sportTypeDefault : "1");
          setIsOpen(true);
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

      {(isOpen ||
        isOpenRecord.action === "view" ||
        isOpenRecord.action === "edit") && (
        <div
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center
            bg-black/50 backdrop-blur-sm transition-opacity duration-300 mt-[40px] md:mt-0
            h-[100dvh] ${isClosing ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className={`bg-gray-900 text-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6
              transform transition-all duration-300 max-h-[70vh] md:max-h-full modal-content overflow-y-auto
              ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
          >
            <h2 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400">
              {isOpenRecord.action === "add" || isOpenRecord.action === "close"
                ? "Add New Record"
                : isOpenRecord.action === "edit"
                ? "Edit Record"
                : "View Record"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="w-full sm:w-48">
                  <label className="block mb-1 text-sm text-gray-300">
                    Sport Type
                  </label>
                  <Controller
                    name="sportType"
                    control={control}
                    rules={{ required: "Please select a sport" }}
                    render={({ field }) => (
                      <>
                        <CustomSelectField
                          disabled={
                            isOpenRecord.action === "view" ||
                            isOpenRecord.action === "edit"
                          }
                          options={sportOptions}
                          value={field.value}
                          onChange={val => field.onChange(val.toString())}
                          placeholder="Select sport..."
                        />
                      </>
                    )}
                  />
                  {errors.sportType && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.sportType.message}
                    </p>
                  )}
                </div>

                <div className="w-full sm:w-48">
                  <label className="block mb-1 text-sm text-gray-300">
                    Date
                  </label>
                  <Controller
                    name="dateTime"
                    disabled={
                      isOpenRecord.action === "view" ||
                      isOpenRecord.action === "edit"
                    }
                    control={handler.control}
                    rules={{ required: "Please select a date" }}
                    render={({ field }) => (
                      <DatePickerCustom
                        isDisabled={
                          isOpenRecord.action === "view" ||
                          isOpenRecord.action === "edit"
                        }
                        isDefaultNone
                        isDateTo
                        value={
                          field.value
                            ? (() => {
                                const [year, month, day] = field.value
                                  .split("-")
                                  .map(Number);
                                return new Date(year, month - 1, day);
                              })()
                            : undefined
                        }
                        onChange={date =>
                          field.onChange(handler.formatDateToISOString(date))
                        }
                      />
                    )}
                  />
                  {errors.dateTime && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.dateTime.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">Game</label>
                <Controller
                  name="game"
                  control={control}
                  rules={{
                    required: ["1", "2", "3", "4"].includes(
                      gameOptionsStatus.value
                    )
                      ? "No games available"
                      : "Please select a game",
                  }}
                  render={({ field, fieldState }) => {
                    let placeholderText = "Select a game...";
                    let isDisabled = false;

                    switch (gameOptionsStatus.value) {
                      case "1":
                        placeholderText = "Select sport and date first";
                        isDisabled = true;
                        break;
                      case "2":
                        placeholderText = "Loading games...";
                        isDisabled = true;
                        break;
                      case "3":
                        placeholderText = "Loading games failed!";
                        isDisabled = true;
                        break;
                      case "4":
                        placeholderText = "No games available";
                        isDisabled = true;
                        break;
                      default:
                        placeholderText = "Select a game...";
                        isDisabled = gameOptions.length === 0;
                        break;
                    }

                    return (
                      <>
                        <CustomSelectField
                          options={gameOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={placeholderText}
                          disabled={
                            isDisabled ||
                            isOpenRecord.action === "view" ||
                            isOpenRecord.action === "edit"
                          }
                        />
                        {fieldState.error && (
                          <p className="text-red-400 text-sm mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Predict Value
                </label>
                <input
                  type="text"
                  disabled={
                    isOpenRecord.action === "view" ||
                    isOpenRecord.action === "edit"
                  }
                  inputMode="text"
                  {...register("predictValue", { required: "Enter a value" })}
                  className="w-full p-2 rounded-lg bg-[#1a1f2b] border border-gray-700 
    focus:border-green-400 focus:outline-none transition
    disabled:bg-[#121622] disabled:text-gray-500 disabled:border-gray-600 disabled:opacity-60"
                  placeholder="Enter value..."
                />
                {errors.predictValue && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.predictValue.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Result
                </label>
                <CustomSelectField
                  disabled={isOpenRecord.action === "view"}
                  options={[
                    { value: "WIN", label: "Win" },
                    { value: "LOSE", label: "Lose" },
                    { value: "DRAW", label: "Draw" },
                    { value: "CANCEL", label: "Cancel" },
                    { value: "PENDING", label: "Pending" },
                  ]}
                  value={watch("result")}
                  onChange={val =>
                    setValue("result", val as GameStatusType, {
                      shouldValidate: true,
                    })
                  }
                  placeholder="Select result..."
                />
                {errors.result && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.result.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Profit
                </label>
                <input
                  disabled={isOpenRecord.action === "view"}
                  type="number"
                  {...register("profit", {
                    required: "Enter profit value",
                    valueAsNumber: true,
                  })}
                  className="w-full p-2 rounded-lg bg-[#1a1f2b] border border-gray-700
    focus:border-green-400 focus:outline-none transition-all duration-300 ease-in-out
    disabled:bg-[#121622] disabled:text-gray-500 disabled:cursor-not-allowed
    disabled:border-gray-600 disabled:opacity-60"
                  placeholder="Enter profit..."
                />
                {errors.profit && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.profit.message}
                  </p>
                )}
              </div>

              {/* --- Action Buttons --- */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300
                    bg-transparent transition-all duration-300 ease-out
                    hover:bg-[#1a1f2b] hover:text-white hover:border-gray-400
                    hover:shadow-lg hover:shadow-gray-700/40
                    hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cancel
                </button>
                {isOpenRecord.action !== "view" && (
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center justify-center text-green-400 border border-green-400 
    bg-transparent font-medium rounded-xl text-sm px-7 py-2.5 text-center 
    shadow-none transition-all duration-300 ease-out
    hover:text-white hover:bg-green-400/20 hover:border-green-500
    hover:shadow-lg hover:shadow-green-500/30
    hover:scale-[1.02] active:scale-[0.98]
    disabled:opacity-70 disabled:cursor-wait"
                  >
                    {isSaving ? (
                      <svg
                        className="animate-spin h-5 w-5 text-green-400"
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
                      <>Save</>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
