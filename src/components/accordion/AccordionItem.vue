<template>
  <v-expansion-panel class="accordion-item">
    <v-expansion-panel-title>
      <template #actions="{ expanded }">
        <v-switch
          v-if="state !== undefined"
          color="accent"
          :model-value="state"
          hide-details
          class="mr-5"
          @update:model-value="emit('update:state', $event)"
          @click="$event.stopPropagation()" 
        />
        <v-icon
          v-if="draggable"
          class="mr-3 drag-handle"
          :icon="mdiDrag"
        />
        <v-icon
          :class="{ 'action-icon': true, 'rotated-180': expanded }"
          :icon="mdiChevronDown"
        />
      </template>
      <div class="accordion-item-header">
        <div class="accordion-item-header-icon mr-5">
          <slot name="icon">
            <v-icon
              v-if="icon"
              :size="iconSize"
              :icon="icon"
            />
          </slot>
        </div>
        <div>
          <slot name="header">
            <div
              class="accordion-item-title"
              v-text="title"
            />
            <div
              class="accordion-item-subtitle"
              v-text="subtitle"
            />
          </slot>
        </div>
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="accordion-item-content">
        <slot />
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { mdiChevronDown, mdiDrag } from '@mdi/js'
import { Component } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  iconSize?: number
  draggable?: boolean
  state?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  icon: '',
  iconSize: 28,
  draggable: false,
  state: undefined
})

const emit = defineEmits<{
  (e: 'update:state', value: boolean): void
}>()

</script>

<style lang="scss" scoped>
.accordion-item-header {
  display: flex;
  line-height: 1.5em;
  align-items: center;
}

.v-expansion-panel-header {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.accordion-item-content {
  font-size: 1rem;
  padding: 0.6em 0 0;
}

.v-expansion-panel :deep(.v-expansion-panel__shadow) {
  display: none !important;
}

.v-expansion-panel:not(.v-expansion-panel--active)::before {
  box-shadow: none;
}

.accordion-item.v-expansion-panel.v-expansion-panel--active {
  background: var(--color-base-00);
  border-radius: var(--border-radius) !important;
}


.v-expansion-panel-header::before {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.accordion-item-subtitle {
  opacity: 0.8;
  font-size: 0.9em;
}

.action-icon {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  &.rotated-180 {
    transform: rotate(180deg);
  }
}

.v-expansion-panel-text {
  background: var(--color-base-20);
}


.v-expansion-panel :deep(.v-expansion-panel-title__icon) {
  align-items: center;
}

.v-expansion-panel-title {
  box-shadow: none;
  height: 56px;
}

.v-expansion-panel-title:hover > :deep(.v-expansion-panel-title__overlay) {
  opacity: 0.01;
}
</style>