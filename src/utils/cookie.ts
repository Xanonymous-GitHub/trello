import { AppState } from "@/store/types/app";

// eslint-disable-next-line
export function saveStatePlugin(store: any) {
  store.subscribe((state: AppState) => {
    localStorage.setItem("board", JSON.stringify(state.board));
  });
}
