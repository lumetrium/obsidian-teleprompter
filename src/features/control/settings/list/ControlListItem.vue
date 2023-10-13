<template>
  <div
    class="control-list-item-container"
    :class="{ '-open': isOpenConfigure }"
  >
    <div class="control-list-item">
      <ControlIcon class="flex-shrink-0" />
      <div class="control-list-item-content">
        <div
          class="control-list-item-name"
          v-text="item.state.label"
        />
        <div
          class="control-list-item-desc"
          v-text="item.state.desc"
        />
      </div>
      <div class="control-list-item-spacer" />
      <ControlListItemActions
        v-model:isOpenConfigure="isOpenConfigure"
        :item="item"
        @remove="emit('remove')"
      />
    </div>
    <v-expand-transition>
      <ControlListItemConfigure v-if="isOpenConfigure" />
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import ControlListItemActions from '@/features/control/settings/list/ControlListItemActions.vue'
import ControlListItemConfigure from '@/features/control/settings/list/ControlListItemConfigure.vue'
import type { PluggableControl } from '@/features/control/types'
import { ref } from 'vue'
import { useProvideControlStore } from '@/features/control/store/control.store'

interface Props {
  item: PluggableControl
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const isOpenConfigure = ref(false)

useProvideControlStore(props.item)
</script>

<style scoped lang="scss">
.control-list-item-container {
  transition:
    box-shadow 0.5s ease,
    padding 0.3s ease,
    margin 0.3s ease;
  border-radius: 8px;
  padding: 0.25em 0.5em;

  &.-open {
    box-shadow: 0 0 1px 1px rgba(var(--mono-rgb-100), 0.5);
    padding-bottom: 1.5em;

    .control-list-item {
      padding-bottom: 1em;
    }

    & + .-open {
      margin-top: 1em;
    }
  }
}

.control-list-item {
  display: flex;
  align-items: center;
  padding: 0.5em 0;
  transition: padding 0.3s ease;
}

.control-list-item-content {
  padding: 0 0 0 1em;
  flex-shrink: 0;

  .control-list-item-desc {
    opacity: 0.7;
    font-size: 0.9em;
    margin-top: 0.1em;
  }
}

.control-list-item-spacer {
  border-bottom: 1px dashed var(--divider-color);
  width: 100%;
  flex-shrink: 1;
  margin: 0 1em;
}
</style>
