import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { GameRecordData } from "../../models/mainTableModels";
import axiosClient from "../../api/axiosClient";
import type { GameOption } from "../../models/gameOptionModels";
import { useToast } from "../../hooks/useContextHook";

export default function useAddNewRecordHook(
  setIsOpenRecord: React.Dispatch<
    React.SetStateAction<{
      id: string;
      action: "add" | "edit" | "view" | "close";
    }>
  >,
  gameRecordData?: GameRecordData
) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [gameOptions, setGameOptions] = useState<GameOption[]>([]);
  const [gameOptionsStatus, setGameOptionsStatus] = useState<
    | { label: "Loading games..."; value: "2" }
    | { label: "Loading games failed!"; value: "3" }
    | { label: "No games available"; value: "4" }
    | { label: ""; value: "" }
  >({ label: "Loading games...", value: "2" });
  // --- React Hook Form ---
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<GameRecordData>({
    defaultValues: {
      sportType: gameRecordData?.sportType || "",
      dateTime: gameRecordData?.dateTime || "",
      game: gameRecordData?.game || "",
      predictValue: gameRecordData?.predictValue || "",
      result: gameRecordData?.result || "PENDING",
      profit: gameRecordData?.profit || 0,
    },
  });

  const sportType = watch("sportType");
  const dateTime = watch("dateTime");
  const formatTimeAMPM = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  useEffect(() => {
    if (sportType && dateTime) {
      setGameOptionsStatus({ label: "Loading games...", value: "2" });
      setValue("game", "2");
      const fetchGames = async () => {
        try {
          const response = await axiosClient.get(
            `/games?league=${sportType}&date=${dateTime}`
          );
          // Giả lập dữ liệu trả về
          return response.data;
        } catch (error) {
          setGameOptionsStatus({ label: "Loading games failed!", value: "3" });
          console.error("Error fetching games:", error);
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
        if (gameOptionsRespond.length > 0) {
          setValue("game", gameOptionsRespond[0].value);
        }
        setGameOptionsStatus(
          gameOptionsRespond.length > 0
            ? { label: "", value: "" }
            : { label: "No games available", value: "4" }
        );
      });
    } else {
      setGameOptions([]);
    }
  }, [sportType, dateTime, setValue]);

  const closeModal = () => {
    setIsClosing(true);
    setIsOpenRecord({ id: "", action: "close" });
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  };
  const formatSubmitGameData = (game: GameRecordData) => {
    return {
      date: gameOptions.find(g => g.value === game.game)?.date || "",
      game: game.game || "",
      predictValue: game.predictValue.toString() || "",
      profit: game.profit || 0,
      result: game.result.toLocaleLowerCase() || "pending",
      sportType: game.sportType || "",
    };
  };
  const onSubmit = async (data: GameRecordData) => {
    setIsSaving(true);
    try {
      await axiosClient
        .post("/predict_records", formatSubmitGameData(data))
        .then(() => {
          showToast({
            title: "Saved successfully",
            message: "The record has been saved",
            type: "success",
          });
        });
      reset();
      closeModal();
    } finally {
      setIsSaving(false);
    }
  };

  const state = {
    isOpen,
    isClosing,
    isSaving,
    gameOptions,
    errors,
    gameOptionsStatus,
    getValues,
  };

  const handler = {
    setIsOpen,
    closeModal,
    handleSubmit: handleSubmit(onSubmit),
    register,
    setGameOptionsStatus,
    reset,
  };

  return { state, handler };
}
