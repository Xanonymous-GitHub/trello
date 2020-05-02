<template>
  <div class="board">
    <div class="flex flex-wrap item-start position-relative">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="column.id"
        :column="column"
        :board="board"
        :columnIndex="$columnIndex"
      />
      <div class="column flex">
        <input
          type="text"
          placeholder="+ New Column Name"
          v-model="newColumnName"
          class="full-width border-none background-none font-small at-bottom"
          @keyup.enter="createColumn"
        />
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
import BoardColumn from "@/components/BoardColumn.vue";
import * as mutationTypes from "@/store/modules/app/mutation-types";

@Component({
  components: {
    BoardColumn,
  },
})
export default class Board extends Vue {
  private trelloTask!: TrelloTask;

  private newColumnName = "";

  @State("board", { namespace: "app" })
  private board!: TrelloBoard;

  @Getter("getTask", { namespace: "app" })
  private getTask!: (id: string) => TrelloTask;

  @Mutation(mutationTypes.CREATE_COLUMN, { namespace: "app" })
  private CREATE_COLUMN!: (data: object) => void;

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

  private close() {
    this.$router.replace({ name: "board" });
  }

  private createColumn() {
    this.CREATE_COLUMN({
      name: this.newColumnName,
    });
    this.newColumnName = "";
  }
}
</script>
