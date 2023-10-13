<template>
  <v-text-field v-model="state.value" />
</template>

<script setup lang="ts">
import type { ControlTextState } from '@/features/control/types'
import { useControlStore } from '@/features/control/store/control.store'

const { state } = useControlStore<ControlTextState>()
</script>
