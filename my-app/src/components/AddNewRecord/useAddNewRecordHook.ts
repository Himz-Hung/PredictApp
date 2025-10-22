import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type {
  GameRecordData,
  updateRecordModal,
} from "../../models/mainTableModels";
import type { GameOption } from "../../models/gameOptionModels";
import axiosClient from "../../api/axiosClient";
import { useToast } from "../../hooks/useContextHook";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createRecord,
  fetchRecords,
  updateRecord,
} from "../../store/adminRecordsSlice";

interface ModalState {
  id: string;
  action: "add" | "edit" | "view" | "close";
}

export default function useAddNewRecordHook(
  setIsOpenRecord: React.Dispatch<React.SetStateAction<ModalState>>,
  onchangeSportType?: (sportType: string) => void,
  gameRecordData?: GameRecordData,
  isOpenRecord?: ModalState,
  sportTypeDefault?: string
) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  // ---------------- STATE ----------------
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [gameOptions, setGameOptions] = useState<GameOption[]>([]);
  const [gameOptionsStatus, setGameOptionsStatus] = useState<
    | {
        label: "Select sport and date first";
        value: "1";
      }
    | { label: "Loading games..."; value: "2" }
    | { label: "Loading games failed!"; value: "3" }
    | { label: "No games available"; value: "4" }
    | { label: ""; value: "" }
  >({ label: "Loading games...", value: "2" });

  const sportOptions = [
    { value: "nba-basketball", label: "NBA-Basketball" },
    { value: "nfl-football", label: "NFL-Football" },
    { value: "nhl-hockey", label: "NHL-Hockey" },
    { value: "mlb-baseball", label: "MLB-Baseball" },
    { value: "ncaa-basketbal", label: "NCAA-Basketball" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<GameRecordData>({
    defaultValues: {
      sportType: "",
      dateTime: gameRecordData?.dateTime || "",
      game: gameRecordData?.game || "",
      predictValue: gameRecordData?.predictValue || "",
      result: gameRecordData?.result || "PENDING",
      profit: gameRecordData?.profit || 0,
      recordId: gameRecordData?.recordId || "",
    },
  });
  const recordsData = useAppSelector(state => state.adminRecords.data);
  const sportType = watch("sportType");
  const dateTime = watch("dateTime");
  useEffect(() => {
    if (isOpenRecord?.action === "edit" || isOpenRecord?.action === "view") {
      if (recordsData) {
        const record = recordsData[Number(isOpenRecord.id)];

        if (record?.date) {
          const datePart = record.date.split(" ")[0];
          const [month, day, year] = datePart.split("/");
          const formattedDate = `${year}-${month.padStart(
            2,
            "0"
          )}-${day.padStart(2, "0")}`;
          setValue("dateTime", formattedDate);
        }
        setGameOptions([
          {
            label: recordsData[Number(isOpenRecord.id)].games,
            value: recordsData[Number(isOpenRecord.id)].games,
            date: "",
          },
        ]);
        setValue("game", recordsData[Number(isOpenRecord.id)].games);
        setValue("predictValue", recordsData[Number(isOpenRecord.id)].pick);
        setValue("profit", recordsData[Number(isOpenRecord.id)].profit);
        setValue("result", recordsData[Number(isOpenRecord.id)].result);
        setValue("sportType", sportTypeDefault ? sportTypeDefault : "");
        setValue("recordId", recordsData[Number(isOpenRecord.id)].recordId);
      }
    }
  }, [
    isOpenRecord,
    isOpenRecord?.action,
    recordsData,
    setValue,
    sportTypeDefault,
  ]);

  const formatTimeAMPM = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateToISOString = (date: Date): string => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const closeModal = () => {
    reset();
    setIsClosing(true);
    setIsOpenRecord({ id: "", action: "close" });
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };

  useEffect(() => {
    if (isOpenRecord?.action !== "add") {
      return;
    }
    if (!sportType || !dateTime) {
      setGameOptions([]);
      setGameOptionsStatus({
        label: "Select sport and date first",
        value: "1",
      });
      return;
    }

    setGameOptionsStatus({ label: "Loading games...", value: "2" });
    setValue("game", "2");

    const fetchGames = async () => {
      try {
        const response = await axiosClient.get(
          `/games?league=${sportType}&date=${dateTime}`
        );
        return response.data;
      } catch (error) {
        if (error instanceof Error && error.message === "JWT-INVALID") {
          navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
        }
        console.error("Error fetching games:", error);
        setGameOptionsStatus({ label: "Loading games failed!", value: "3" });
        return [];
      }
    };

    fetchGames().then(games => {
      const gameList = games?.member;
      const gameOptionsRespond: GameOption[] = [];
      for (let index = 0; index < gameList.length; index++) {
        const game = gameList[index];
        gameOptionsRespond.push({
          label: `(${game?.awayTeamAbbr} vs ${game?.homeTeamAbbr}) ${
            game?.gameName
          } at ${formatTimeAMPM(game?.date)}`,
          value: game?.gameName,
          date: game?.date,
        });
      }
      setGameOptions(gameOptionsRespond);

      if (gameOptionsRespond.length === 0) {
        setGameOptionsStatus({ label: "No games available", value: "4" });
        setValue("game", "");
      } else {
        setGameOptionsStatus({ label: "", value: "" });
        setValue("game", gameOptionsRespond[0]?.value || "");
      }
    });
  }, [sportType, dateTime, setValue, navigate, isOpenRecord?.action]);

  const formatSubmitGameData = (game: GameRecordData) => ({
    date: gameOptions.find(g => g.value === game.game)?.date || "",
    game: game.game || "",
    predictValue: game.predictValue.toString() || "",
    profit: game.profit || 0,
    result: game.result.toLowerCase() || "pending",
    sportType: game.sportType || "",
  });
  const formatUpdateGameData = (game: GameRecordData): updateRecordModal => ({
    profit: game.profit || 0,
    result: game.result.toLowerCase() || "pending",
    id: getValues("recordId") || "",
  });

  const onSubmit = async (data: GameRecordData) => {
    if (isOpenRecord?.action === "view" || isOpenRecord?.action === "close") {
      return;
    }
    if (isOpenRecord?.action === "edit") {
      console.log(formatUpdateGameData(data));

      setIsSaving(true);
      try {
        await dispatch(updateRecord(formatUpdateGameData(data))).unwrap();

        showToast({
          title: "Saved successfully",
          message: "The record has been saved",
          type: "success",
        });

        if (onchangeSportType) onchangeSportType(sportType);
        await dispatch(fetchRecords(sportType));

        reset();
        closeModal();
        return;
      } catch (error) {
        if (error === "JWT-INVALID") {
          navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
          return;
        } else {
          showToast({
            title: "Save failed",
            message: "Unable to save the record",
            type: "error",
          });
          return;
        }
      } finally {
        setIsSaving(false);
      }
    }
    if (isOpenRecord?.action === "add") {
      setIsSaving(true);
      try {
        await dispatch(createRecord(formatSubmitGameData(data))).unwrap();

        showToast({
          title: "Saved successfully",
          message: "The record has been saved",
          type: "success",
        });

        if (onchangeSportType) onchangeSportType(sportType);
        await dispatch(fetchRecords(sportType));

        reset();
        closeModal();
      } catch (error) {
        if (error === "JWT-INVALID") {
          navigate("/login", { replace: true, state: { message: "EXP-JWT" } });
        } else {
          showToast({
            title: "Save failed",
            message: "Unable to save the record",
            type: "error",
          });
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  // ---------------- RETURN ----------------
  return {
    state: {
      isOpen,
      isClosing,
      isSaving,
      gameOptions,
      gameOptionsStatus,
      errors,
      getValues,
      sportOptions,
    },
    handler: {
      setIsOpen,
      closeModal,
      handleSubmit: handleSubmit(onSubmit),
      register,
      formatDateToISOString,
      setGameOptionsStatus,
      reset,
      watch,
      setValue,
      control,
    },
  };
}
