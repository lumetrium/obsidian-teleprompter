import { useOpenSettingsFeature } from '@/features/open-settings'
import { useFullscreenFeature } from '@/features/fullscreen'
import { watch } from 'vue'

export function useFullscreenInObsidian(options: {
  containerEl: HTMLElement
}): { unload: () => void } {
  const { containerEl: el } = options

  const openSettingsFeature = useOpenSettingsFeature()
  const fullscreenStore = useFullscreenFeature().useStore()

  const unwatch = watch(
    () => fullscreenStore.value,
    (value) => {
      if (value && !isFullscreen()) el.requestFullscreen()
      else if (!value && isFullscreen()) activeDocument.exitFullscreen()
    },
  )

  el.addEventListener('fullscreenchange', update)
  openSettingsFeature.addEventListener('click', turnOff)

  const interval = setInterval(() => {
    // this is needed for mobile, when the user swipes to hide the plugin's view
    // it is required to exit the fullscreen mode, otherwise everything freezes
    if (fullscreenStore.value && !el.checkVisibility()) turnOff()
  }, 2000)

  function update() {
    fullscreenStore.value = isFullscreen()
  }

  function turnOff() {
    fullscreenStore.value = false
  }

  function isFullscreen() {
    return activeDocument.fullscreenElement === el
  }

  update()

  return {
    unload() {
      unwatch()
      el.removeEventListener('fullscreenchange', update)
      openSettingsFeature.removeEventListener('click', turnOff)
      clearInterval(interval)
      turnOff()
    },
  }
}
