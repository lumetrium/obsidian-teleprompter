<template>
  <vue-markdown
    class="md-content"
    :source="contentProcessed"
    :plugins="plugins"
  />
</template>

<script setup lang="ts">
import { useContentStore } from '@/features/content/store/content.store'
import VueMarkdown from 'vue-markdown-render'
import MarkdownItCallouts from 'markdown-it-callouts'

import { toRefs } from 'vue'

const { contentProcessed } = toRefs(useContentStore())
const plugins = [MarkdownItCallouts]
</script>
