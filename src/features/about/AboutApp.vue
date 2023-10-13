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
      <TeleprompterLogo
        :pulse-petal="4"
        height="100%"
      />
    </v-avatar>
    <div>
      <v-card-title class="text-h4 pb-0">{{ APP_NAME }}</v-card-title>
      <v-card-subtitle>
        <a
          style="overflow-wrap: anywhere"
          class="link"
          target="_blank"
          :href="'https://' + APP_WEBSITE"
          v-text="APP_WEBSITE"
        />
      </v-card-subtitle>
      <v-card-text>
        An Obsidian plugin designed to seamlessly integrate
        teleprompter functionality into your note-taking workflow.
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {AUTHOR_NAME, AUTHOR_WEBSITE, APP_NAME, APP_WEBSITE} from '@/constants'
import LumetriumLogo from '@/components/icons/LumetriumLogo.vue'
import TeleprompterLogo from '@/components/icons/TeleprompterLogo.vue'
</script>

<style scoped lang="scss"></style>
