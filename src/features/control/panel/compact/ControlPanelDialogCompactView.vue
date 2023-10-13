<template>
  <v-dialog>
    <template #activator="{ props }">
      <slot
        name="activator"
        v-bind="props"
      >
        <v-btn
          v-bind="props"
          icon
        >
          <slot name="icon">
            <ControlIcon />
          </slot>
        </v-btn>
      </slot>
    </template>
    <ControlView />
  </v-dialog>
</template>

<script setup lang="ts">
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import ControlView from '@/features/control/views/ControlView.vue'
</script>
