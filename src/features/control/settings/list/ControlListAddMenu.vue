<template>
  <div>
    <v-menu
      ref="menuRef"
      v-model="isOpen"
      :close-on-content-click="false"
      location="right center"
      offset="10"
      transition="slide-x-transition"
    >
      <template #activator="{ props }">
        <v-btn v-bind="props">
          <v-icon
            :icon="mdiPlus"
            class="mr-2"
          />
          <span v-text="'Add control'" />
        </v-btn>
      </template>

      <v-list class="control-list-add-menu">
        <v-list-item class="pt-2">
          <v-text-field
            v-model="query"
            autofocus
            hide-details
            label="🔍 Search"
            single-line
          />
        </v-list-item>
        <v-list
          class="results-languages-add-list"
          lines="two"
        >
          <v-list-item
            v-if="!items.length"
            class="text-center opacity-05"
          >
            <v-list-item-title>
              <span v-text="'No results'" />
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="item in items"
            :key="item.id"
            @click="select(item)"
          >
            <template #prepend>
              <ControlIcon :id="item.id" />
            </template>
            <v-list-item-title>
              <span v-text="item.state.label" />
            </v-list-item-title>
            <v-list-item-subtitle>
              <span v-text="item.state.desc" />
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useControlFeature } from '@/features/control'
import ControlIcon from '@/features/control/elements/ControlIcon.vue'
import type { PluggableControl } from '@/features/control/types'
import { mdiPlus } from '@mdi/js'
import { computed, ref } from 'vue'

const isOpen = ref(false)

const store = useControlFeature().useStore()

const emit = defineEmits<{
  (e: 'select', item: PluggableControl): void
}>()

const query = ref('')

const items = computed(() => {
  const plugins = Object.values(store.plugins).sort((a, b) =>
    a.state.label > b.state.label ? 1 : -1,
  )
  return !query.value
    ? plugins
    : plugins.filter(
        (item) =>
          item.state.label?.toLowerCase().includes(query.value.toLowerCase()) ||
          item.state.desc?.toLowerCase().includes(query.value.toLowerCase()),
      )
})

function select(item: PluggableControl) {
  emit('select', item)
  isOpen.value = false
}
</script>

<style scoped lang="scss">
.control-list-add-menu {
  min-width: 300px;
  max-height: 500px;
  padding-top: 0;

  :deep(.v-list-item__spacer) {
    display: none;
  }

  .v-list-item__prepend > .v-icon,
  .v-list-item__prepend > .v-badge {
    margin-inline-end: 15px;
  }

  :deep(.v-list-item__content) {
    overflow: visible;
  }

  .v-list-item-subtitle {
    opacity: 0.7;
    //padding-bottom: 1px;
  }
}
</style>
