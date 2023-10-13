<template>
  <v-menu
    v-model="isOpen"
    :close-on-content-click="false"
    offset-y
    location="bottom end"
  >
    <template #activator="slotData">
      <slot
        name="activator"
        v-bind="slotData"
      >
        <v-btn
          v-bind="slotData.props"
          class="confirm-btn"
        >
          <v-icon
            :icon="actionIcon"
            class="mr-2"
          />
          <span v-text="actionText" />
        </v-btn>
      </slot>
    </template>

    <v-card>
      <v-card-title>
        <span v-text="actionText" />
        <v-icon
          v-if="actionIcon"
          :icon="actionIcon"
          :size="20"
        />
      </v-card-title>
      <v-card-subtitle><span v-text="title" /></v-card-subtitle>
      <v-card-text><span v-text="text" /></v-card-text>
      <v-card-actions>
        <v-btn
          class="confirm-btn-cancel"
          @mousedown="$event.preventDefault()"
          @click="cancel"
        >
          <v-icon :icon="cancelIcon" />
          <span v-text="cancelText" />
        </v-btn>
        <v-btn
          class="confirm-btn-confirm"
          @mousedown="$event.preventDefault()"
          @click="confirm"
        >
          <v-icon :icon="confirmIcon" />
          <span v-text="confirmText" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiAlert, mdiClose } from '@mdi/js'
import { ref, watch } from 'vue'

interface Props {
  modelValue?: boolean
  actionText?: string
  actionIcon?: string
  title?: string
  text?: string
  confirmText?: string
  cancelText?: string
  confirmIcon?: string
  cancelIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: 'Are you sure?',
  text: 'Please confirm your action',
  confirmText: 'I am sure',
  cancelText: 'Cancel',
  confirmIcon: mdiAlert,
  cancelIcon: mdiClose,
  actionText: undefined,
  actionIcon: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const isOpen = ref(props.modelValue)
function confirm() {
  emit('confirm')
  isOpen.value = false
}

function cancel() {
  emit('cancel')
  isOpen.value = false
}

watch(isOpen, (value) => emit('update:modelValue', value))
watch(
  () => props.modelValue,
  (value) => (isOpen.value = value),
)
</script>

<style scoped lang="scss">
.confirm-btn {
  transition: border-color 200ms linear;
  border: 1px solid transparent;

  &[aria-expanded='true'] {
    border-color: var(--color-red);
  }
}

.v-card-title {
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;

  .v-icon {
    opacity: 0.7;
  }
}

.v-card-text {
  max-width: 270px;
  padding-top: 1em;
}

.v-card-actions {
  justify-content: center;

  .v-btn {
    padding: 0 1em;

    .v-icon {
      margin-right: 0.3em;
      transition: color 100ms linear;
    }
  }

  .confirm-btn-cancel:hover .v-icon {
    color: var(--color-green);
  }

  .confirm-btn-confirm:hover .v-icon {
    color: var(--color-red);
  }
}
</style>
