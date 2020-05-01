import { GetterTree } from "vuex";
import { AppState, TrelloTask } from "@/store/types/app";
import { RootState } from "@/store/types/root";

export const getters: GetterTree<AppState, RootState> = {
  getTask: (state): TrelloTask => (id: string) => {
    for (const column of state.board.columns) {
      for (const task of column.tasks) {
        if (task.id === id) {
          return task;
        }
      }
    }
  },
};
