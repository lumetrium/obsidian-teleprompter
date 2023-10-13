<template>
  <component
    :is="component"
    v-if="content"
  />
  <p v-else class="content-placeholder">Focus any note</p>
</template>

<script setup lang="ts">
import { useContentStore } from '@/features/content/store/content.store'
import { computed, toRefs } from 'vue'

const { views, activeViewId, content } = toRefs(useContentStore())

const component = computed(() => {
  const view = views.value[activeViewId.value]
  return view?.components?.content?.()
})
</script>

<style scoped lang="scss">
.content-placeholder {
  font-size: 1.5rem;
}
</style>
