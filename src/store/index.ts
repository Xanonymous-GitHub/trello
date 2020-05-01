import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { app } from "./modules/app";
import { RootState } from "./types/root";
import { saveStatePlugin } from "@/utils/cookie";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "",
  },
  modules: { app },
  plugins: [saveStatePlugin],
};

export default new Vuex.Store<RootState>(store);
