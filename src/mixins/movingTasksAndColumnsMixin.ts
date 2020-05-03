import { Component, Vue, Prop } from "vue-property-decorator";
import { TrelloColumn, TrelloBoard, TransferData } from "@/store/types/app";
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

  @Prop({ required: false })
  private taskIndex!: number;

  @Mutation(mutationTypes.MOVE_TASK, { namespace: "app" })
  private MOVE_TASK!: (data: object) => void;

  @Mutation(mutationTypes.MOVE_COLUMN, { namespace: "app" })
  private MOVE_COLUMN!: (data: object) => void;

  private moveTaskOrColumn(transferData: TransferData) {
    const type = transferData.type;
    if (type === "task") {
      this.moveTask(transferData);
    } else {
      this.moveColumn(transferData);
    }
  }

  private moveTask({ fromColumnIndex, fromTaskIndex }: TransferData) {
    const fromTasks = this.board.columns[fromColumnIndex as number].tasks;
    this.MOVE_TASK({
      fromTasks,
      fromTaskIndex,
      toTasks: this.column.tasks,
      toTaskIndex: this.taskIndex,
    });
  }
  private moveColumn({ fromColumnIndex }: TransferData) {
    this.MOVE_COLUMN({
      fromColumnIndex,
      toColumnIndex: this.columnIndex,
    });
  }
}
export default MovingTasksAndColumnsMixin;
