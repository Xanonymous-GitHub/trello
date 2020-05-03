<template>
  <div
    class="full-width full-width-_600px task no-effect flex flex-column items-start justify-between full-height-90p"
  >
    <input
      class="full-width font-large border-none font-bold word-wrap"
      :value="task.name"
      @change="updateTaskProperty($event, 'name')"
      @keyup.enter="finishEdittingTaskName($event, 'name')"
      placeholder="Enter a task name"
    />
    <textarea
      class="position-relative border-none full-height-max-content full-width"
      :value="task.description"
      placeholder="Enter some descriptions"
      @change="updateTaskProperty($event, 'description')"
      @keyup="updateTextAreaSize($event)"
      @focus="updateTextAreaSize($event)"
      @show="updateTextAreaSize($event)"
      @play="updateTextAreaSize($event)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { TrelloTask } from "@/store/types/app";
import * as mutationTypes from "@/store/modules/app/mutation-types";
@Component({})
export default class Task extends Vue {
  @Prop()
  private trelloTask!: TrelloTask;

  @Mutation(mutationTypes.UPDATE_TASK, { namespace: "app" })
  private UPDATE_TASK!: (data: object) => void;

  private get task() {
    return this.trelloTask;
  }

  private updateTaskProperty(event: any, key: string) {
    this.UPDATE_TASK({
      task: this.task,
      key,
      value: event.target.value.trim(),
    });
  }

  private updateTextAreaSize(event: any) {
    event.target.style.height = "1px";
    event.target.style.height = 25 + event.target.scrollHeight + "px";
  }

  @Emit("needToBeClose")
  private finishEdittingTaskName(event: any, key: string): void {
    this.updateTaskProperty(event, key);
  }
}
</script>
