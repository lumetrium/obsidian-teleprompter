import { ItemView, type WorkspaceLeaf } from 'obsidian'
import { type App as VueApp, createApp, watch } from 'vue'
import App from './App.vue'
import { createVuetifyWithOptions } from './libs/vuetify'
import {
  APP_ATTR,
  APP_CLASS,
  APP_NAME,
  VIEW_CLASS,
  VIEW_TYPE,
} from '@/constants'
import { useFullscreenFeature } from '@/features/fullscreen'
import { useOpenSettingsFeature } from '@/features/open-settings'
import { useOpacityInObsidian } from '@/features/opacity/integrations/useOpacityInObsidian'

export class TeleprompterView extends ItemView {
  vueapp: VueApp

  unloadQueue: (() => void)[] = []

  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }
  getViewType(): string {
    return VIEW_TYPE
  }
  getDisplayText(): string {
    return APP_NAME
  }
  getIcon(): string {
    return 'scroll'
  }

  onload() {
    this.initFullscreen()

    const { unload: unloadOpacity } = useOpacityInObsidian({
      app: this.app,
      containerEl: this.containerEl,
      viewSelector: `.${VIEW_CLASS}`,
    })

    this.unloadQueue.push(
      unloadOpacity,
    )
  }

  onunload() {
    this.unloadQueue.forEach((u) => u())
  }

  async onOpen() {
    const { contentEl, containerEl } = this
    contentEl.empty()
    const div = contentEl.createDiv()

    if (!containerEl.hasClass(APP_CLASS)) {
      containerEl.classList.add(APP_CLASS)
      containerEl.classList.add(VIEW_CLASS)
      containerEl.setAttribute(APP_ATTR, '')
    }

    contentEl.style.padding = '0'
    div.style.height = '100%'

    this.vueapp = createApp(App)
    this.vueapp.use(
      createVuetifyWithOptions({
        container: `.${VIEW_CLASS}`,
      }),
    )

    setTimeout(() => this.vueapp.mount(div))
  }

  async onClose() {
    this.vueapp?.unmount()
  }

  private initFullscreen() {
    const el = this.containerEl

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

    this.unloadQueue.push(
      unwatch,
      () => el.removeEventListener('fullscreenchange', update),
      () => openSettingsFeature.removeEventListener('click', turnOff),
    )

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
  }

}
