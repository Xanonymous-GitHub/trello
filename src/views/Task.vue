<template>
  <div class="full-width task flex flex-col items-start justify-between">
    {{ task.name }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// import { Getter } from "vuex-class";
import { TrelloTask } from "../store/types/app";
@Component({})
export default class Task extends Vue {
  @Prop()
  private trelloTask!: TrelloTask;

  private get task() {
    return this.trelloTask;
  }
}
</script>
