<template>
  <div>
    <div class="text-h5">Recommendations</div>
    <div class="mt-1 mb-4">
      Boost your overall productivity with this
      highly customizable browser extension:
    </div>
    <a
      href="https://lumetrium.com/definer"
      class="recommendation"
    >
      <DefinerLogo height="50" />
      <div>
        <div class="name">Definer - Popup Dictionary & Translator</div>
        <div class="desc">
          Instant definitions, translations, and search results for words and
          phrases you select or type.
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import DefinerLogo from '@/components/icons/DefinerLogo.vue'
</script>

<style scoped lang="scss">
.recommendation {
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--text-normal);
  text-decoration: none;

  &:hover .name {
    text-decoration: underline;
    color: var(--link-color-hover);
  }

  .name {
    margin-bottom: 0.2em;
    color: var(--link-color);
    font-weight: var(--bold-weight);
  }
}
</style>
