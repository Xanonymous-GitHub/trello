import { GetterTree, ActionTree, MutationTree, ModuleTree } from "vuex";

export interface Module<S, R> {
  namespace?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  actions?: ActionTree<S, R>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<R>;
}
