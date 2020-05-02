import { Component, Vue, Prop } from "vue-property-decorator";
import { TrelloColumn, TrelloBoard, TrelloTask } from "@/store/types/app";
import { Mutation } from "vuex-class";
import * as mutationTypes from "@/store/modules/app/mutation-types";
@Component
class MovingTasksAndColumnsMixin extends Vue {
  @Prop({ required: true })
  private board!: TrelloBoard;

  @Prop({ required: true })
  private column!: TrelloColumn;

  @Prop({ required: true })
  private columnIndex!: number;

  @Mutation(mutationTypes.MOVE_TASK, { namespace: "app" })
  private MOVE_TASK!: (data: object) => void;

  @Mutation(mutationTypes.MOVE_COLUMN, { namespace: "app" })
  private MOVE_COLUMN!: (data: object) => void;

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
export default MovingTasksAndColumnsMixin;
