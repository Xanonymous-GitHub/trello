<template>
  <div class="board">
    <div class="flex flex-wrap item-start position-relative">
      <div
        :key="column.id"
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        draggable
        @dragstart.self="pickupColumn($event, $columnIndex)"
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center font-bold font-xx-large position-relative"
        >
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            :key="task.id"
            class="task flex-column"
            v-for="(task, $taskIndex) of column.tasks"
            draggable
            @click.prevent="goToTask(task)"
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="
              moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)
            "
          >
            <span class="font-left font-bold">{{ task.name }}</span>
            <p
              class="font-left font-xx-small word-wrap"
              v-if="task.description"
            >
              {{ task.description }}
            </p>
          </div>
          <label>
            <input
              @keyup.enter="createTask($event, column.tasks)"
              class="full-width border-none background-none font-small at-bottom"
              placeholder="+ Enter a new task"
            />
          </label>
        </div>
      </div>
    </div>
    <div
      @click.self="close"
      class="task-view flex items-center"
      v-if="isTaskOpen"
    >
      <router-view :trelloTask="trelloTask" @needToBeClose="close" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Getter, Mutation } from "vuex-class";
import { TrelloBoard, TrelloTask } from "@/store/types/app";
import { mutations } from "@/store/modules/app/mutations";
import * as mutationTypes from "@/store/modules/app/mutation-types";

@Component({})
export default class Board extends Vue {
  private trelloTask!: TrelloTask;

  @State("board", { namespace: "app" })
  private board!: TrelloBoard;

  @Getter("getTask", { namespace: "app" })
  private getTask!: (id: string) => TrelloTask;

  @Mutation(mutationTypes.CREATE_TASK, { namespace: "app" })
  private CREATE_TASK!: (data: object) => void;

  @Mutation(mutationTypes.MOVE_TASK, { namespace: "app" })
  private MOVE_TASK!: (data: object) => void;

  @Mutation(mutationTypes.MOVE_COLUMN, { namespace: "app" })
  private MOVE_COLUMN!: (data: object) => void;

  public beforeMount() {
    this.$store.registerModule("Board", {
      mutations,
    });
  }

  public destroyed() {
    this.$store.unregisterModule("Board");
  }

  private get isTaskOpen(): boolean {
    if (this.$route.name === "task") {
      this.trelloTask = this.getTask(this.$route.params.id);
      if (!this.trelloTask) {
        this.$router.replace({ path: "/" });
        return false;
      }
      return true;
    }
    return false;
  }

  private goToTask(task: TrelloTask): void {
    this.$router.push({ name: "task", params: { id: task.id as string } });
  }

  private close() {
    this.$router.replace({ name: "board" });
  }

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
