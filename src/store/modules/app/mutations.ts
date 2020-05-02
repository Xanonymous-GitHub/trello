import Vue from "vue";
import { MutationTree } from "vuex";
import { AppState } from "@/store/types/app";
import * as mutationTypes from "./mutation-types";
import uuid from "@/utils/uuid";
export const mutations: MutationTree<AppState> = {
  [mutationTypes.CREATE_TASK](state, { tasks, name }) {
    tasks.push({
      name,
      id: uuid(),
      description: "",
    });
  },
  [mutationTypes.UPDATE_TASK](state, { task, key, value }) {
    Vue.set(task, key, value);
  },
  [mutationTypes.MOVE_TASK](
    state,
    { fromTasks, toTasks, fromTaskIndex, toTaskIndex }
  ) {
    const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
    toTasks.splice(toTaskIndex, 0, taskToMove);
  },
  [mutationTypes.MOVE_COLUMN](state, { fromColumnIndex, toColumnIndex }) {
    const columnList = state.board.columns;
    const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
    columnList.splice(toColumnIndex, 0, columnToMove);
  },
};
