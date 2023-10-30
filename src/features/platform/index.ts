import {defineFeature} from '@/features/feature'
import { Platform, type PlatformType } from '@/features/platform/enums'
import {computed, ref} from 'vue'

export const usePlatformFeature = defineFeature('platform', (id) => {
  const platform = ref<PlatformType | null>(null)

  return {
    persist: false,
    setPlatform: (value: PlatformType) => (platform.value = value),
    useStore: () => ({
      isMobile: computed(() => platform.value === Platform.MOBILE),
      isDesktop: computed(() => platform.value === Platform.DESKTOP),
      isWeb: computed(() => platform.value === Platform.WEB),
    }),
  }
})