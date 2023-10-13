<template>
  <Accordion>
    <AccordionItem
      v-for="(v, i) of value"
      :key="i"
      v-bind="accordionItemProps[i]"
    >
      <SettingField
        v-model="value[i]"
        label="Value"
        desc="Current value"
        type="number"
      />

      <SettingField
        v-model="resetValue[i]"
        label="Reset value"
        desc="Value that will be applied when you reset it"
        type="number"
      />

      <SettingField
        v-model="min[i]"
        label="Minimum"
        desc="Lowest possible value"
        type="number"
      />

      <SettingField
        v-model="max[i]"
        label="Maximum"
        desc="Highest possible value"
        type="number"
      />

      <SettingField
        v-model="step[i]"
        label="Step"
        desc="How much the value will increase/decrease at a time"
        type="number"
      />

      <SettingField
        v-model="labels[i]"
        label="Label"
        desc="Text that is displayed in front of the slider"
      />
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import {type ControlMultiSliderState, ControlSliderState} from '@/features/control/types'
import SettingField from '@/features/settings/components/elements/SettingField.vue'
import { useControlStore } from '@/features/control/store/control.store'
import Accordion from '@/components/accordion/Accordion.vue'
import AccordionItem from '@/components/accordion/AccordionItem.vue'
import { computed, toRefs } from 'vue'

const { state, defaults } = useControlStore<ControlMultiSliderState>()
const { value, resetValue, min, max, step, labels, icons } = toRefs(state.value)

const accordionItemProps = computed(() =>
  labels.value.map((label, i) => ({
    title: defaults.value.labels[i],
    subtitle: label === defaults.value.labels[i] ? '' : label,
    icon: icons.value?.[i],
  })),
)
</script>
