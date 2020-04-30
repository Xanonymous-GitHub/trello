import { Module } from "vuex";
import { AppState } from "../../types/app";
import { RootState } from "../../types/root";
import { state } from "./state";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";

const namespaced = true;

export const app: Module<AppState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
