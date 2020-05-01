<template>
  <div
    class="full-width full-width-_600px task no-effect flex flex-column items-start justify-between"
  >
    {{ task.name }}
    <textarea class="position-relative border-none" :value="task.description" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// import { Getter } from "vuex-class";
import { TrelloTask } from "@/store/types/app";
@Component({})
export default class Task extends Vue {
  @Prop()
  private trelloTask!: TrelloTask;

  private get task() {
    return this.trelloTask;
  }
}
</script>
