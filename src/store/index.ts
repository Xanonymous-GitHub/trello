import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { app } from "./modules/app";
import { RootState } from "./types/root";
import { saveBoardPlugin } from "@/utils/storage";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "",
  },
  modules: { app },
  plugins: [saveBoardPlugin],
};

export default new Vuex.Store<RootState>(store);
