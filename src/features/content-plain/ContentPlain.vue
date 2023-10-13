<template>
  <div
    class="plain-content"
    v-text="plain"
  />
</template>

<script setup lang="ts">
import { useContentStore } from '@/features/content/store/content.store'
import removeMd from 'remove-markdown'
import { computed } from 'vue'
import { toRefs } from 'vue'

const { content } = toRefs(useContentStore())
const plain = computed(() => removeMd(content.value))
</script>
