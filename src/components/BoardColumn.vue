<template>
  <div
    class="column"
    draggable
    @dragstart.self="pickupColumn($event, columnIndex)"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="flex items-center font-bold font-xx-large position-relative">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="task.id"
        :board="board"
        :task="task"
        :column="column"
        :taskIndex="$taskIndex"
        :columnIndex="columnIndex"
      />
      <label>
        <input
          @keyup.enter="createTask($event, column.tasks)"
          class="full-width border-none background-none font-small at-bottom"
          placeholder="+ Enter a new task"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { TrelloColumn, TrelloBoard } from "@/store/types/app";
import { TrelloTask } from "@/store/types/app";
import * as mutationTypes from "@/store/modules/app/mutation-types";
import ColumnTask from "@/components/ColumnTask.vue";

@Component({
  components: {
    ColumnTask,
  },
})
export default class BoardColumn extends Vue {
  @Prop({ required: true })
  private board!: TrelloBoard;

  @Prop({ required: true })
  private column!: TrelloColumn;

  @Prop({ required: true })
  private columnIndex!: number;

  @Mutation(mutationTypes.CREATE_TASK, { namespace: "app" })
  private CREATE_TASK!: (data: object) => void;

  @Mutation(mutationTypes.MOVE_TASK, { namespace: "app" })
  private MOVE_TASK!: (data: object) => void;

  @Mutation(mutationTypes.MOVE_COLUMN, { namespace: "app" })
  private MOVE_COLUMN!: (data: object) => void;

  private async createTask(event: any, tasks: TrelloTask) {
    let newValue;
    await new Promise((resolve) => {
      newValue = event.target.value.trim();
      event.target.value = "";
      resolve();
    });
    if (!newValue) {
      return;
    }
    this.CREATE_TASK({
      tasks,
      name: newValue,
    });
  }

  private pickupColumn(event: any, fromColumnIndex: number) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("from-column-index", fromColumnIndex);
    event.dataTransfer.setData("type", "column");
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
