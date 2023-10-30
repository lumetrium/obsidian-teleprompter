import { type App, Platform } from 'obsidian'
import { useOpacityFeature } from '@/features/opacity'
import { watch } from 'vue'

type BrowserWindow = {
  isDestroyed: () => boolean
  setOpacity: (opacity: number) => void
}

export function useOpacityInObsidian(options: {
  app: App
  containerEl: HTMLElement
  viewSelector: string
}): { unload: () => void } {
  if (Platform.isMobileApp) return { unload: () => {} }

  const { app, containerEl, viewSelector } = options
  const opacityStore = useOpacityFeature().useStore()

  function restore() {
    getAllWindows().forEach((win: BrowserWindow) => setWinOpacity(win, 1))
  }
  async function apply() {
    if (!containerEl.checkVisibility()) return restore()
    update()
  }

  function update() {
    const opacity = opacityStore.value <= 10 ? 0.1 : opacityStore.value / 100
    const windows = getAllWindows()
    const q = `!!window.document.querySelector('${viewSelector}')`
    windows.forEach((win: any) =>
      win.webContents
        .executeJavaScript(q)
        .then((hasApp: boolean) => setWinOpacity(win, hasApp ? opacity : 1)),
    )
  }

  function setWinOpacity(win: BrowserWindow, opacity: number) {
    if (win.isDestroyed()) return
    win.setOpacity(opacity)
  }

  const unwatchApply = watch(() => opacityStore.value, apply)
  const eventRefs = [
    app.workspace.on('window-open', apply),
    app.workspace.on('window-close', apply),
    app.workspace.on('active-leaf-change', apply),
  ]

  function getAllWindows() {
    return (window as any)
      .require('electron')
      .remote.BrowserWindow.getAllWindows()
  }

  setTimeout(apply, 500)

  return {
    unload() {
      restore()
      unwatchApply()
      eventRefs.forEach((eventRef) => app.workspace.offref(eventRef))
    },
  }
}
