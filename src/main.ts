import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AppButton from "@/components/AppButton.vue";
import "@/assets/scss/main.scss";

Vue.component("AppButton", AppButton);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
