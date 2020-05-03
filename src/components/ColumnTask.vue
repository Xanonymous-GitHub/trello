<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task flex-column"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
      @click.prevent="goToTask(task)"
    >
      <span class="font-left font-bold">{{ task.name }}</span>
      <p class="font-left font-xx-small word-wrap" v-if="task.description">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { TrelloTask } from "../store/types/app";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

@Component({
  components: {
    AppDrag,
    AppDrop,
  },
})
export default class ColumnTask extends Mixins(movingTasksAndColumnsMixin) {
  @Prop({ required: true })
  private task!: TrelloTask;

  private goToTask(task: TrelloTask): void {
    this.$router.push({ name: "task", params: { id: task.id as string } });
  }
}
</script>
