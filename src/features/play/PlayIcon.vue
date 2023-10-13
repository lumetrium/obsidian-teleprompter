<template>
  <v-icon :icon="icon" class="play-icon" />
</template>

<script setup lang="ts">
import type { ControlToggleState} from '@/features/control/types'
import { mdiPause, mdiPlay } from '@mdi/js'
import { computed, toRefs } from 'vue'

const props = defineProps<ControlToggleState>()
const { value } = toRefs(props)

const icon = computed(() => value.value ? mdiPause : mdiPlay)

</script>

<style scoped lang="scss">
.play-icon {
  color: var(--color-green);
  //transition: all 200ms linear;
}
</style>
