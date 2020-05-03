<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex,
      }"
    >
      <input
        type="text"
        :value="column.name"
        class="column-name items-center font-bold font-xx-large position-relative word-wrap border-none background-none"
      />

      <div class="list-reset full-width">
        <ColumnTask
          v-for="(taskc, $taskIndex) of column.tasks"
          :key="taskc.id"
          :board="board"
          :task="taskc"
          :column="column"
          :taskIndex="$taskIndex"
          :columnIndex="columnIndex"
        />
        <label>
          <input
            @keyup.enter="createTask($event, column.tasks)"
            class="new-task-input full-width border-none background-none font-small at-bottom position-relative position-left word-wrap"
            placeholder="+ Enter a new task"
          />
        </label>
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { TrelloTask } from "@/store/types/app";
import * as mutationTypes from "@/store/modules/app/mutation-types";
import ColumnTask from "@/components/ColumnTask.vue";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

@Component({
  components: {
    ColumnTask,
    AppDrag,
    AppDrop,
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
    event.dataTransfer.setData("from-column-index", fromColumnIndex);
    event.dataTransfer.setData("type", "column");
  }
}
</script>
