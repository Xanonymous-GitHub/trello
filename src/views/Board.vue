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
          <div class="task" v-for="task of column.tasks" :key="task.id">
            <span class="width-full flex font-bold">{{ task.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { TrelloBoard } from "@/store/types/app";
@Component({})
export default class Board extends Vue {
  @State("board", { namespace: "app" })
  private board!: TrelloBoard;
}
</script>
