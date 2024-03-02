import { useControlFeature } from '@/features/control'
import { ControlType } from '@/features/control/enums'
import { defineFeature } from '@/features/feature'
import { ref, watch } from 'vue'
import CountdownIcon from '@/features/countdown/CountdownIcon.vue'
import { usePlayFeature } from '@/features/play'
import CountdownControlSettings from '@/features/countdown/CountdownControlSettings.vue'
import { useCommandFeature } from '@/features/commands'

export const useCountdownFeature = defineFeature('countdown', (id) => {
  const value = ref(0)
  const resetValue = ref(10)
  const label = 'Countdown'
  const desc = 'Countdown before play in seconds'
  const resetOnPause = ref(false)

  const playStore = usePlayFeature().useStore()

  useCommandFeature().use(id, [
    {
      id: 'countdown:reset-on-pause:true',
      name: 'Countdown - reset on pause - toggle on',
      callback: () => (resetOnPause.value = true),
    },
    {
      id: 'countdown:reset-on-pause:false',
      name: 'Countdown - reset on pause - toggle off',
      callback: () => (resetOnPause.value = false),
    },
    {
      id: 'countdown:reset-on-pause:toggle',
      name: 'Countdown - reset on pause - toggle',
      callback: () => (resetOnPause.value = !resetOnPause.value),
    },
  ])

  useControlFeature().use({
    id,
    type: ControlType.SLIDER,
    defaults: {
      label,
      desc,
      value: value.value,
      resetValue: resetValue.value,
      min: 0,
      max: 30,
      step: 1,
    },
    state: {
      value,
      resetValue,
    },
    components: {
      icon: () => CountdownIcon,
      settings: () => CountdownControlSettings,
    },
  })

  watch(
    () => playStore.value,
    (isPlaying) => {
      if (!isPlaying && resetOnPause.value) value.value = resetValue.value
    },
  )

  setInterval(() => {
    if (playStore.value && value.value > 0) value.value -= 1
  }, 1000)

  return {
    useStore: () => ({
      value,
      resetOnPause,
    }),
  }
})
