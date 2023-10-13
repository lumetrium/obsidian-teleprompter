<template>
  <v-tooltip
    :model-value="isOpenTooltip"
    :location="tooltipLocation"
    :disabled="true"
    :contained="true"
  >
    <template #activator="{ props: tooltip }">
      <div
        class="control-panel-view"
        v-bind="tooltip"
        :class="{
          vertical: isVertical,
          horizontal: isHorizontal,
          compact: isCompact,
        }"
        @mouseenter="toggleTooltip(true)"
        @mouseleave="toggleTooltip(false)"
        @mousedown="toggleTooltip(false)"
      >
        <component
          :is="component"
          v-if="component"
        />
      </div>
    </template>
    <div>
      <div v-text="controlState.label" />
      <div
        v-if="controlState.desc"
        class="control-desc"
        v-text="controlState.desc"
      />
    </div>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useProvideControlStore } from '@/features/control/store/control.store'
import type { PluggableControl } from '@/features/control/types'
import { computed, ref } from 'vue'
import { usePanelStore } from '@/features/panel/store/panel.store'
import { PanelAlignment } from '@/features/panel/constants'

interface Props {
  item: PluggableControl
}

const props = defineProps<Props>()

const { components, state: controlState } = useProvideControlStore(props.item)

const {
  getIsCompact,
  isVertical,
  isHorizontal,
  tooltipLocation,
  state: panelState,
} = usePanelStore<PluggableControl>()

const justify = computed(() => {
  switch (panelState.value.alignment) {
    case PanelAlignment.LEFT:
      return 'flex-start'
    case PanelAlignment.RIGHT:
      return 'flex-end'
    default:
      return 'center'
  }
})

const isCompact = computed(() => getIsCompact({ width: 120, height: 80 }))

const component = computed(() =>
  isCompact.value
    ? components.getPanelCompactView()
    : components.getPanelView(),
)

const isOpenTooltip = ref(false)

function toggleTooltip(state: boolean) {
  if (isCompact.value) isOpenTooltip.value = state
}
</script>

<style scoped lang="scss">
.control-panel-view {
  > :deep(.v-btn),
  :deep(.control-btn) {
    border-radius: 0;
    box-shadow: none;
    background: inherit;
    .v-btn__content {
      overflow: hidden;
      width: 100%;
      height: 100%;
      padding: 0.8em;
    }
  }

  &.horizontal {
    //border-right: 1px solid rgba(var(--mono-rgb-100), 0.08);
    height: 100%;
    > :deep(.v-btn) {
      height: 100%;
    }

    &:not(.compact) {
      > :deep(*) {
        min-width: 165px;
        height: 100% !important;
        flex-shrink: 1;
        > .v-btn {
          height: 100% !important;
          flex-shrink: 1;
        }
      }
    }
  }

  &.vertical {
    width: 100%;
    //border-bottom: 1px solid rgba(var(--mono-rgb-100), 0.08);
    > :deep(.v-btn),
    :deep(.control-btn) {
      width: 100%;
      justify-content: v-bind(justify) !important;
    }
  }
}

.control-desc {
  font-size: 0.9em;
  opacity: 0.8;
  max-width: 170px;
}
</style>
