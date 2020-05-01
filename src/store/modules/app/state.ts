import { board } from "@/store/modules/app/board";
import { AppState, TrelloBoard } from "@/store/types/app";

const currentBoard =
  (JSON.parse(localStorage.getItem("board") as string) as TrelloBoard) || board;

export const state: AppState = {
  board: currentBoard,
};
