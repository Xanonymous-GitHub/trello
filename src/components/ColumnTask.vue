<template>
  <div
    class="task flex-column"
    draggable
    @click.prevent="goToTask(task)"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
  >
    <span class="font-left font-bold">{{ task.name }}</span>
    <p class="font-left font-xx-small word-wrap" v-if="task.description">
      {{ task.description }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { TrelloTask } from "../store/types/app";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

@Component({})
export default class ColumnTask extends Mixins(movingTasksAndColumnsMixin) {
  @Prop({ required: true })
  private task!: TrelloTask;

  @Prop({ required: true })
  private taskIndex!: number;

  private goToTask(task: TrelloTask): void {
    this.$router.push({ name: "task", params: { id: task.id as string } });
  }

  private pickupTask(
    event: any,
    fromTaskIndex: number,
    fromColumnIndex: number
  ) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("from-task-index", fromTaskIndex);
    event.dataTransfer.setData("from-column-index", fromColumnIndex);
    event.dataTransfer.setData("type", "task");
  }
}
</script>
