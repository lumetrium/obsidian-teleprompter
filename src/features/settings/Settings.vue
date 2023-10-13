<template>
  <div>
    <SettingsTabs />
  </div>
</template>

<script setup lang="ts">
import SettingsTabs from '@/features/settings/components/tabs/SettingsTabs.vue'
import { useSettingsFeature } from '@/features/settings/index'
import { computed, ref } from 'vue'
</script>

<style scoped lang="scss"></style>
