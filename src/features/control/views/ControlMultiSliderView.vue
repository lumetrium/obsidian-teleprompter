<template>
  <div class="control-box">
    <RangeInput
      v-for="(v, i) of value"
      :key="i"
      v-model="value[i]"
      class="box-range-input"
      hide-reset
      :label="labels[i]"
      :min="min[i]"
      :max="max[i]"
      :step="step[i]"
    />
  </div>
</template>

<script setup lang="ts">
import RangeInput from '@/components/RangeInput.vue'
import type { ControlMultiSliderState } from '@/features/control/types'
import { useControlStore } from '@/features/control/store/control.store'
import { toRefs } from 'vue'

const { state } = useControlStore<ControlMultiSliderState>()
const { value, min, max, step, labels } = toRefs(state.value)
</script>
<style scoped lang="scss">
.control-box {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  ::v-deep(.v-label) {
    //text-align: right;
    min-width: 60px;
    justify-content: flex-end;
    justify-self: flex-end;
  }
}
</style>
