<template>
  <component
    :is="component"
    v-if="component"
    v-bind="state"
    class="flex-shrink-0"
  />
  <v-icon
    v-else
    :icon="svgIcon"
    class="flex-shrink-0"
  />
</template>

<script setup lang="ts">
import type { ControlType } from '@/features/control/enums'
import type { ControlState, ControlStateType } from '@/features/control/types'
import { type Component, computed, unref } from 'vue'
import {
  useControlStore,
  useProvideControlStore,
} from '@/features/control/store/control.store'

type SelectableState = ControlStateType<typeof ControlType.SELECT>

interface Props {
  id?: string
  icon?: string
  component?: Component
  state?: ControlState<any>
}

const props = defineProps<Props>()
const { control } = useControlStore() ?? useProvideControlStore(props.id)

const items = computed(() => unref((state.value as SelectableState)?.items))
const selectedItemIcon = computed(
  () => items.value?.find((item) => item.id === state.value.value)?.icon,
)

const svgIcon = computed(
  () => props.icon ?? selectedItemIcon.value ?? control?.value?.icon,
)
const component = computed(
  () => props.component ?? control?.value?.components?.icon?.(),
)

const state = computed(() => props.state ?? control?.value?.state)
</script>