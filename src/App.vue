<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { app } from "@/store/modules/app";
@Component({})
export default class App extends Vue {
  public beforeMount() {
    this.$store.registerModule("App", {
      ...app,
    });
  }

  public destroyed() {
    this.$store.unregisterModule("App");
  }
}
</script>
