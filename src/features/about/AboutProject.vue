<template>
  <v-card
    class="d-flex align-center"
    elevation="0"
  >
    <v-avatar
      tile
      size="120"
      class="mr-3 overflow-visible"
    >
      <LumetriumLogo
        :pulse-petal="4"
        height="100%"
      />
    </v-avatar>
    <div>
      <v-card-title class="text-h4 pb-0">{{ AUTHOR_NAME }}</v-card-title>
      <v-card-subtitle>
        <a
          style="overflow-wrap: anywhere"
          class="link"
          target="_blank"
          :href="'https://' + AUTHOR_WEBSITE"
          v-text="AUTHOR_WEBSITE"
        />
      </v-card-subtitle>
      <v-card-text>
        Project dedicated to enhancing personal productivity by offering a
        suite of tools designed to empower individuals in their pursuit of peak
        efficiency.
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { AUTHOR_NAME, AUTHOR_WEBSITE } from '@/constants'
import LumetriumLogo from '@/components/icons/LumetriumLogo.vue'
</script>

<style scoped lang="scss"></style>
