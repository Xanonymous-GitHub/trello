import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { app } from "./modules/app";
import { RootState } from "./types/root";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "",
  },
  modules: { app },
};

export default new Vuex.Store<RootState>(store);
