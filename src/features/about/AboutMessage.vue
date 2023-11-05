<template>
  <div>
    Thank you for using this plugin. If you encounter any issues, please don't
    hesitate to
    <a :href="APP_ISSUES_LINK">create a new issue</a>
    on GitHub. For questions or feedback, feel free to
    <a :href="APP_DISCUSSIONS_LINK"> start a discussion</a>. Your input is greatly
    appreciated!
  </div>
</template>

<script setup lang="ts">
import { APP_ISSUES_LINK, APP_DISCUSSIONS_LINK } from '@/constants'
</script>
