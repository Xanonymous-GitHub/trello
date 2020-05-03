<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
@Component({})
export default class AppDrop extends Vue {
  @Emit("drop")
  private onDrop(event: any) {
    const transferData = JSON.parse(event.dataTransfer.getData("payload"));
    return transferData;
  }
}
</script>
