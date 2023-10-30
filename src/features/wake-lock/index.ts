import { defineFeature } from '@/features/feature'
import { ref } from 'vue'
import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import WakeLockIcon from '@/features/wake-lock/WakeLockIcon.vue'

export const useWakeLockFeature = defineFeature('wake-lock', (id) => {
  const isEnabled = ref(true)

  const isSupported = navigator && 'wakeLock' in navigator
  const isActive = ref(false)

  let wakeLock: WakeLockSentinel | null

  async function request() {
    if (!isSupported || !isEnabled.value || wakeLock) return
    wakeLock = await navigator.wakeLock.request('screen')
    isActive.value = !wakeLock.released
  }

  async function release() {
    if (!isSupported || !wakeLock) return
    await wakeLock.release()
    isActive.value = !wakeLock.released
    wakeLock = null
  }

  useControlFeature().use({
    id,
    type: ControlType.TOGGLE,
    defaults: {
      label: 'No sleep',
      desc: 'Prevent display sleep',
      value: isEnabled.value,
      activeLabel: 'Active',
    },
    state: {
      value: isEnabled,
    },
    components: {
      icon: () => WakeLockIcon,
    },
  })

  return {
    request,
    release,
    useStore: () => ({
      isEnabled,
      isActive,
    }),
    persist: {
      reduce: (state) => ({
        isEnabled: isEnabled.value,
      }),
    }
  }
})
