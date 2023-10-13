<template>
  <div class="about">
    <AboutProject />
    <hr/>
    <AboutApp />
    <hr/>
    <AboutMessage />
    <hr />
    <AboutRecommendations />
  </div>
</template>

<script setup lang="ts">
import AboutProject from '@/features/about/AboutProject.vue'
import AboutApp from '@/features/about/AboutApp.vue'
import AboutMessage from '@/features/about/AboutMessage.vue'
import AboutRecommendations from '@/features/about/AboutRecommendations.vue'
</script>

<style scoped lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  hr {
    width: 100%;
  }
}
</style>
