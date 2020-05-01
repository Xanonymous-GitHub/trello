<template>
  <div
    class="full-width full-width-_600px task flex flex-col items-start justify-between"
  >
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
