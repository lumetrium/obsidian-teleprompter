<template>
  <v-select
    :model-value="modelValue as T"
    :label="label"
    :hint="hint"
    hide-details
    item-color="secondary"
    :item-title="itemTitle"
    :item-value="itemValue"
    :items="items"
  >
    <template #selection="{ item }">
      <v-icon
        v-if="item.raw[itemIcon]"
        class="mr-3"
        :icon="item.raw[itemIcon]"
      />
      <span v-text="item.title" />
    </template>
    <template #item="{ item, props: { onClick } }">
      <v-list-item @click="onItemClick(item.raw, onClick)">
        <v-list-item-title>
          <v-icon
            v-if="item.raw[itemIcon]"
            class="mr-3"
            :icon="item.raw[itemIcon]"
          />
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts" generic="T">
interface Props {
  modelValue: T
  items: Record<string, any>[]
  itemTitle?: string
  itemValue?: string
  itemIcon?: string
  label?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  itemTitle: 'title',
  itemValue: 'value',
  itemIcon: 'icon',
  label: '',
  hint: '',
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()

function onItemClick(item: Record<string, any>, defaultCallback: unknown) {
  if (typeof defaultCallback === 'function') defaultCallback()
  emit('update:modelValue', item[props.itemValue])
}
</script>
