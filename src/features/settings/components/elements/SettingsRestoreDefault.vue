<template>
  <ConfirmationMenu
    :action-text="`Restore defaults`"
    :action-icon="mdiBackupRestore"
    :text="`Reset the settings to their default values.`"
    :confirm-icon="mdiAlert"
    :cancel-icon="mdiClose"
    @confirm="emit('confirm')"
  />
</template>

<script setup lang="ts">
import ConfirmationMenu from '@/components/ConfirmationMenu.vue'
import { mdiAlert, mdiBackupRestore, mdiClose } from '@mdi/js'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>