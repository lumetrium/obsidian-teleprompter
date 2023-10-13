<template>
  <span class="panel-icon">
    <v-icon
      :size="size"
      :icon="mdiPageLayoutHeaderFooter"
    />
  </span>
</template>

<script setup lang="ts">
import { mdiPageLayoutHeaderFooter } from '@mdi/js'

interface Props {
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
})
</script>
