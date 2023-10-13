<template>
  <div class="control-list-item-actions">
    <v-btn
      class="configure-btn"
      :class="{ '-active': isOpenConfigure }"
      variant="text"
      size="small"
      icon
      @click="emit('update:isOpenConfigure', !isOpenConfigure)"
    >
      <v-icon :icon="mdiCog" />
    </v-btn>

    <ConfirmationMenu
      text="You're about to remove this control from the list"
      action-text="Remove"
      :action-icon="mdiDelete"
      :confirm-icon="mdiAlert"
      :cancel-icon="mdiClose"
      @confirm="emit('remove')"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          size="small"
          icon
        >
          <v-icon :icon="mdiDelete" />
        </v-btn>
      </template>
    </ConfirmationMenu>

    <div class="control-list-item-handle drag-handle ml-2">
      <v-icon :icon="mdiDrag" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ConfirmationMenu from '@/components/ConfirmationMenu.vue'
import type { PluggableControl } from '@/features/control/types'
import { mdiAlert, mdiClose, mdiCog, mdiDelete, mdiDrag } from '@mdi/js'
interface Props {
  item: PluggableControl
  isOpenConfigure?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'update:isOpenConfigure', value: boolean): void
}>()
</script>

<style scoped lang="scss">
.control-list-item-actions {
  display: flex;
  align-items: center;
  gap: 0;
  margin-left: auto;
  flex-shrink: 0;
}

.configure-btn {
  transition: transform 0.2s ease-in-out;
  transform: rotate(0deg);
  &:not(.-active):hover {
    transform: rotate(45deg);
  }
  &.-active {
    box-shadow: 0 0 1px 1px var(--color-base-100);
  }
}

.control-list-item-handle {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.1em;
}
</style>