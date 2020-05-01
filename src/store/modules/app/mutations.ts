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
};
