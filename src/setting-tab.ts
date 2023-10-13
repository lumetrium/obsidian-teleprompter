import { createVuetifyWithOptions } from '@/libs/vuetify'
import SettingsApp from '@/SettingsApp.vue'
import { type App as VueApp, createApp } from 'vue'
import { type App as ObsidianApp, PluginSettingTab } from 'obsidian'
import type TeleprompterPlugin from './plugin'
import {APP_ATTR, APP_CLASS, SETTINGS_CLASS} from '@/constants'

export class SettingTab extends PluginSettingTab {
  plugin: TeleprompterPlugin
  vueapp: VueApp
  constructor(app: ObsidianApp, plugin: TeleprompterPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this

    containerEl.empty()
    const div = containerEl.createDiv()

    if (!containerEl.hasClass(SETTINGS_CLASS)) {
      containerEl.classList.add(APP_CLASS)
      containerEl.classList.add(SETTINGS_CLASS)
      containerEl.setAttribute(APP_ATTR, '')
    }

    this.vueapp = createApp(SettingsApp)

    this.vueapp.use(
      createVuetifyWithOptions({
        container: `.${SETTINGS_CLASS}`,
      }),
    )
    this.vueapp.mount(div)
  }
}
