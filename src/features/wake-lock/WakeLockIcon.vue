<template>
  <v-icon
    :icon="icon"
    class="play-icon"
  />
</template>

<script setup lang="ts">
import type { ControlToggleState } from '@/features/control/types'
import { mdiSleep, mdiSleepOff } from '@mdi/js'
import { computed, toRefs } from 'vue'

const props = defineProps<ControlToggleState>()
const { value } = toRefs(props)

const icon = computed(() => (value.value ? mdiSleepOff : mdiSleep))
</script>