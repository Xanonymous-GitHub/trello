import { AppState } from "@/store/types/app";

// eslint-disable-next-line
export function saveStatePlugin(store: any) {
  store.subscribe((state: any) => {
    localStorage.setItem("board", JSON.stringify(store.state.app.board));
  });
}
