<template>
  <div class="board">
    <div class="flex flex-wrap item-start position-relative">
      <div :key="column.id" class="column" v-for="column of board.columns">
        <div
          class="flex items-center font-bold font-xx-large position-relative"
        >
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            :key="task.id"
            @click.prevent="goToTask(task)"
            class="task flex-column"
            v-for="task of column.tasks"
          >
            <span class="font-left font-bold">{{ task.name }}</span>
            <p class="font-left font-xx-small" v-if="task.description">
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

  @Mutation(mutationTypes.CREATE_TASK)
  private CREATE_TASK!: (data: object) => void;

  public beforeMount() {
    this.$store.registerModule("", {
      mutations,
    });
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

  private createTask(event: any, tasks: TrelloTask) {
    this.CREATE_TASK({
      tasks,
      name: event.target.value,
    });
    event.target.value = "";
  }
}
</script>
