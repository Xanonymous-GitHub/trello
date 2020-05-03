<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
    @click.prevent="onClick"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { TransferData } from "@/store/types/app";
@Component({})
export default class AppDrag extends Vue {
  @Prop({ required: true })
  private transferData!: TransferData;

  @Emit("click")
  private onClick() {
    return;
  }

  private onDrag(event: any) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("payload", JSON.stringify(this.transferData));
  }
}
</script>
