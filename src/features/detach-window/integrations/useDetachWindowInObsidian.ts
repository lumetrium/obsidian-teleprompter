import { type App, debounce, Platform } from 'obsidian'
import { useDetachWindowFeature } from '@/features/detach-window'
import { watch } from 'vue'
import { activateViewInObsidian } from '@/utils/activateViewInObsidian'

export function useDetachWindowInObsidian(options: {
  app: App
  viewType: string
}): {
  unload: () => void
} {
  if (Platform.isMobileApp) return { unload: () => {} }

  const { app, viewType } = options
  const detachWindowStore = useDetachWindowFeature().useStore()

  const unwatch = watch(
    () => detachWindowStore.value,
    (value) => {
      if (value && !isDetached()) {
        activateViewInObsidian(viewType, app.workspace, 'window')
      } else if (!value && isDetached()) {
        activateViewInObsidian(viewType, app.workspace, 'sidebar')
      }
    },
  )

  const update = debounce(
    () => (detachWindowStore.value = isDetached()),
    300,
    true,
  )

  app.workspace.on('window-open', update)
  app.workspace.on('window-close', update)

  function isDetached() {
    const leaves = app.workspace.getLeavesOfType(viewType)
    const activeWin =
      leaves.length > 0
        ? leaves[0].view.containerEl.ownerDocument.defaultView
        : activeWindow
    return window !== activeWin
  }

  update()

  return {
    unload() {
      unwatch()
      app.workspace.off('window-open', update)
      app.workspace.off('window-close', update)
    },
  }
}
