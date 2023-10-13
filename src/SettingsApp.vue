<template>
  <v-app>
    <v-main>
      <Settings />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Settings from '@/features/settings/Settings.vue'
</script>

<style lang="scss">
body.app-teleprompter-settings {
  .v-field, .v-field.v-field--variant-plain {
    //--v-input-control-height: calc(var(--input-height) + 8px);

    .v-field__input {
    //font-size: var(--font-ui-small);
      }
  }
}
</style>