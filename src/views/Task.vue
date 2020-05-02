<template>
  <div
    class="full-width full-width-_600px task no-effect flex flex-column items-start justify-between"
  >
    <input
      class="full-width font-large border-none font-bold"
      :value="task.name"
      @change="updateTaskProperty($event, 'name')"
      @keyup.enter="finishEdittingTaskName($event, 'name')"
      placeholder="Enter a task name"
    />
    <textarea
      class="position-relative border-none"
      :value="task.description"
      @change="updateTaskProperty($event, 'description')"
      placeholder="Enter some descriptions"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { TrelloTask } from "@/store/types/app";
import { mutations } from "@/store/modules/app/mutations";
import * as mutationTypes from "@/store/modules/app/mutation-types";
@Component({})
export default class Task extends Vue {
  @Prop()
  private trelloTask!: TrelloTask;

  @Mutation(mutationTypes.UPDATE_TASK, { namespace: "app" })
  private UPDATE_TASK!: (data: object) => void;

  public beforeMount() {
    this.$store.registerModule("Task", {
      mutations,
    });
  }

  public destroyed() {
    this.$store.unregisterModule("Task");
  }

  private get task() {
    return this.trelloTask;
  }

  private updateTaskProperty(event: any, key: string) {
    this.UPDATE_TASK({
      task: this.task,
      key,
      value: event.target.value,
    });
  }

  @Emit("needToBeClose")
  private finishEdittingTaskName(event: any, key: string): void {
    this.updateTaskProperty(event, key);
  }
}
</script>
