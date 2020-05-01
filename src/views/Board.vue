<template>
  <div class="board">
    <div class="flex flex-wrap item-start position-relative">
      <div class="column" v-for="column of board.columns" :key="column.id">
        <div
          class="flex items-center font-bold font-xx-large position-relative"
        >
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task flex-column"
            v-for="task of column.tasks"
            :key="task.id"
            @click.prevent="goToTask(task)"
          >
            <span class="font-left font-bold">{{ task.name }}</span>
            <p class="font-left font-xx-small" v-if="task.description">
              {{ task.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isTaskOpen"
      @click.self="close"
      class="task-view flex items-center"
    >
      <router-view :trelloTask="trelloTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import { TrelloBoard, TrelloTask } from "@/store/types/app";
@Component({})
export default class Board extends Vue {
  private trelloTask!: TrelloTask;

  @State("board", { namespace: "app" })
  private board!: TrelloBoard;

  @Getter("getTask", { namespace: "app" })
  private getTask!: (id: string) => TrelloTask;

  private get isTaskOpen(): boolean {
    if (this.$route.name === "task") {
      this.trelloTask = this.getTask(this.$route.params.id);
      if (this.trelloTask === undefined) {
        this.$router.push({ path: "/" });
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
    this.$router.push({ name: "board" });
  }
}
</script>
