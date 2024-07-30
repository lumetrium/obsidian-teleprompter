import { useOpenSettingsFeature } from '@/features/open-settings'
import { useFullscreenFeature } from '@/features/fullscreen'
import { watch } from 'vue'
import { Platform } from 'obsidian'
import {
  dispatchKeyboardEventInAllWindows,
  executeJsInAllWindows,
  showWindowsWithSelector,
} from '@/utils/electronUtils'

export function useFullscreenInObsidian(options: {
  containerEl: HTMLElement
  viewSelector: string
}): { unload: () => void } {
  const { containerEl: el, viewSelector } = options

  const openSettingsFeature = useOpenSettingsFeature()
  const fullscreenStore = useFullscreenFeature().useStore()

  const unwatch = watch(
    () => fullscreenStore.value,
    async (value) => {
      const isFullscreen = await getIsFullscreen()
      if (value && !isFullscreen) enterFullscreen()
      else if (!value && isFullscreen) exitFullscreen()
    },
  )

  el.addEventListener('fullscreenchange', update)
  openSettingsFeature.addEventListener('click', turnOff)

  const interval = setInterval(() => {
    // this is needed for mobile, when the user swipes to hide the plugin's view
    // it is required to exit the fullscreen mode, otherwise everything freezes
    if (fullscreenStore.value && !el.checkVisibility()) turnOff()
  }, 2000)

  async function update() {
    fullscreenStore.value = await getIsFullscreen()
  }

  function turnOff() {
    fullscreenStore.value = false
  }

  async function getIsFullscreen() {
    if (Platform.isMobileApp) return activeDocument.fullscreenElement === el
    const q = `window.document.fullscreenElement?.matches('${viewSelector}')`
    return executeJsInAllWindows(q).then((matches) => matches.some(Boolean))
  }

  async function enterFullscreen() {
    if (Platform.isDesktopApp) {
      await Promise.all([
        dispatchKeyboardEventInAllWindows(), // otherwise throws "Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture."
        showWindowsWithSelector(viewSelector),
      ])
    }

    return el.requestFullscreen()
  }

  async function exitFullscreen() {
    if (Platform.isMobileApp) return activeDocument.exitFullscreen()
    await executeJsInAllWindows(
      `window.document.fullscreenElement?.matches('${viewSelector}')` +
        `&& window.document.exitFullscreen()`,
    )
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
