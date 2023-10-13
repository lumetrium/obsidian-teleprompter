<template>
  <v-menu
    v-model="isOpen"
    :close-on-content-click="closeOnContentClick"
    :location="location"
  >
    <template #activator="{ props }">
      <slot
        name="activator"
        v-bind="{ props }"
      >
        <v-btn
          v-bind="props"
          icon
        >
          <slot name="icon">
            <v-icon :icon="icon" />
          </slot>
        </v-btn>
      </slot>
    </template>
    <v-card>
      <slot name="content">
        <v-card-item>
          <v-card-title v-if="title">
            {{ title }}
          </v-card-title>
          <v-card-text class="px-0 pt-3">
            <slot />
          </v-card-text>
          <v-card-actions v-if="!hideActions">
            <slot name="actions">
              <v-spacer />
              <v-btn
                v-if="!hideReset"
                text="Reset"
                @click="emit('reset')"
              />
              <v-btn
                text="Close"
                @click="isOpen = false"
              />
            </slot>
          </v-card-actions>
        </v-card-item>
      </slot>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  icon?: string
  closeOnContentClick?: boolean

  hideActions?: boolean
  hideReset?: boolean
  hideClose?: boolean

  location?: 'top' | 'bottom' | 'start' | 'end' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
  closeOnContentClick: false,
  location: 'bottom',
})

const isOpen = ref(false)

const emit = defineEmits<{
  (e: 'reset'): void
}>()
</script>

<style scoped lang="scss">
.v-card {
  min-width: 300px;
  :deep(.v-card-item__content) {
    overflow: visible;
  }
}
</style>
