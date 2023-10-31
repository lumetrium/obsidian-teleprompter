import type { App } from 'obsidian'
import { useWakeLockFeature } from '@/features/wake-lock'
import { watch } from 'vue'

export function useWakeLockInObsidian(options: {
  app: App
  containerEl: HTMLElement
}): {
  unload: () => void
} {
  const { app, containerEl } = options
  const wakeLockFeature = useWakeLockFeature()
  const store = wakeLockFeature.useStore()

  const unwatch = watch(() => store.isEnabled, apply)
  const eventRef = app.workspace.on('active-leaf-change', apply)

  function apply() {
    if (store.isEnabled && containerEl.checkVisibility()) {
      wakeLockFeature.request()
    } else {
      wakeLockFeature.release()
    }
  }

  setTimeout(apply, 2000)

  return {
    unload() {
      unwatch()
      app.workspace.offref(eventRef)
      wakeLockFeature.release()
    },
  }
}
