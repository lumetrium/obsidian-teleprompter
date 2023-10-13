<template>
  <ControlMenu
    :title="state.label"
    :location="menuLocation"
    :transition="menuTransition"
    @reset="state.value = state.resetValue"
  >
    <template #activator="{ props }">
      <slot v-bind="{ props }">
        <ControlButton
          v-bind="props"
          :text="text"
        />
      </slot>
    </template>
    <ControlView />
  </ControlMenu>
</template>

<script setup lang="ts">
import { useControlStore } from '@/features/control/store/control.store'
import ControlButton from '@/features/control/elements/ControlButton.vue'
import { usePanelStore } from '@/features/panel/store/panel.store'
import ControlView from '@/features/control/views/ControlView.vue'
import ControlMenu from '@/features/control/elements/ControlMenu.vue'
import { computed } from 'vue'
interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
})

const text = computed(
  () => props.text || (!state.value.value ? null : String(state.value.value)),
)

const { state } = useControlStore()
const { menuLocation, menuTransition } = usePanelStore()

</script>
