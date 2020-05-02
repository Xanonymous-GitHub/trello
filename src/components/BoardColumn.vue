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
import { Component, Mixins } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { TrelloTask } from "@/store/types/app";
import * as mutationTypes from "@/store/modules/app/mutation-types";
import ColumnTask from "@/components/ColumnTask.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

@Component({
  components: {
    ColumnTask,
  },
})
export default class BoardColumn extends Mixins(movingTasksAndColumnsMixin) {
  @Mutation(mutationTypes.CREATE_TASK, { namespace: "app" })
  private CREATE_TASK!: (data: object) => void;

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
}
</script>
