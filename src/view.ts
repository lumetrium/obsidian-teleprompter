import { ItemView, type WorkspaceLeaf } from 'obsidian'
import { type App as VueApp, createApp } from 'vue'
import App from './App.vue'
import { createVuetifyWithOptions } from './libs/vuetify'
import {
  APP_ATTR,
  APP_CLASS,
  APP_NAME,
  VIEW_CLASS,
  VIEW_TYPE
} from '@/constants'

export class TeleprompterView extends ItemView {
  vueapp: VueApp
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
}
