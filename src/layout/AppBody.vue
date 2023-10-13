<template>
  <v-main>
    <div class="app-body">
      <Content />
    </div>
  </v-main>
</template>

<script setup lang="ts">
import Content from '../features/content/Content.vue'
</script>

<style scoped lang="scss">
.v-main {
  box-sizing: content-box;
}

.app-body {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>