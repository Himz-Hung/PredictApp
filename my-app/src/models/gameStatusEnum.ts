// 📄 src/enums/gameStatusEnum.ts
export const GameStatus = {
  WIN: "WIN",
  LOSE: "LOSE",
  DRAW: "DRAW",
  CANCEL: "CANCEL",
  PENDING: "PENDING",
} as const;

export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus];
