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
import { Vue, Component, Prop } from "vue-property-decorator";
import { TrelloTask, TrelloColumn, TrelloBoard } from "../store/types/app";
import { Mutation } from "vuex-class";
import * as mutationTypes from "@/store/modules/app/mutation-types";

@Component({})
export default class ColumnTask extends Vue {
  @Prop({ required: true })
  private task!: TrelloTask;

  @Prop({ required: true })
  private column!: TrelloColumn;

  @Prop({ required: true })
  private taskIndex!: number;

  @Prop({ required: true })
  private columnIndex!: number;

  @Prop({ required: true })
  private board!: TrelloBoard;

  @Mutation(mutationTypes.MOVE_TASK, { namespace: "app" })
  private MOVE_TASK!: (data: object) => void;

  @Mutation(mutationTypes.MOVE_COLUMN, { namespace: "app" })
  private MOVE_COLUMN!: (data: object) => void;

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

  private moveTaskOrColumn(
    event: any,
    toTasks: TrelloTask,
    toColumnIndex: number,
    toTaskIndex: number
  ) {
    const type = event.dataTransfer.getData("type");
    if (type === "task") {
      this.moveTask(
        event,
        toTasks,
        toTaskIndex !== undefined
          ? toTaskIndex
          : (toTasks as TrelloTask & Array<TrelloTask>).length
      );
    } else {
      this.moveColumn(event, toColumnIndex);
    }
  }

  private moveTask(event: any, toTasks: TrelloTask, toTaskIndex: number) {
    const fromColumnIndex = event.dataTransfer.getData("from-column-index");
    const fromTasks = this.board.columns[fromColumnIndex].tasks;
    const fromTaskIndex = event.dataTransfer.getData("from-task-index");
    this.MOVE_TASK({
      fromTasks,
      fromTaskIndex,
      toTasks,
      toTaskIndex,
    });
  }

  private moveColumn(event: any, toColumnIndex: number) {
    const fromColumnIndex = event.dataTransfer.getData("from-column-index");
    this.MOVE_COLUMN({
      fromColumnIndex,
      toColumnIndex,
    });
  }
}
</script>
