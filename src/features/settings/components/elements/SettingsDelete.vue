<template>
  <ConfirmationMenu
    :action-text="`Delete`"
    :action-icon="mdiDelete"
    :text="`Completely remove the item without the possibility to restore it.`"
    :confirm-icon="mdiAlert"
    :cancel-icon="mdiClose"
    @confirm="emit('confirm')"
  />
</template>

<script setup lang="ts">
import ConfirmationMenu from '@/components/ConfirmationMenu.vue'
import { mdiAlert, mdiBackupRestore, mdiClose, mdiDelete } from '@mdi/js'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>
