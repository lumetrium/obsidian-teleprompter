<template>
  <v-app>
    <AppPanels />
    <AppBody />
  </v-app>
</template>

<script setup lang="ts">
import AppBody from '@/layout/AppBody.vue'
import AppPanels from '@/layout/AppPanels.vue'
</script>

<style scoped lang="scss">
.v-application {
  background: transparent;

  ::v-deep(.v-application__wrap) {
    min-height: 0;
    height: 100%;
  }
}
</style>

<style lang="scss">
@import '@/styles/index.scss';
</style>
