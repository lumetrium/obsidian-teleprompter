<template>
  <vue-markdown
    class="md-content"
    :source="content"
  />
</template>

<script setup lang="ts">
import { useContentStore } from '@/features/content/store/content.store'
import VueMarkdown from 'vue-markdown-render'
import { toRefs } from 'vue'

const { content } = toRefs(useContentStore())
</script>