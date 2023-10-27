import { loadFeatures } from '@/features/loader'
import { debounce, MarkdownView, Plugin } from 'obsidian'
import { useOpenSettingsFeature } from './features/open-settings'
import { SettingTab } from './setting-tab'
import { TeleprompterView } from './view'
import { useCommandFeature } from '@/features/commands'
import { toRefs, watchEffect } from 'vue'
import { useContentFeature } from '@/features/content'
import { usePinNoteFeature } from '@/features/pin-note'
import { APP_ID, APP_NAME, VIEW_TYPE } from '@/constants'
import { initDefaultPanels } from '@/init/initDefaultPanels'
import { getIsDevMode } from '@/utils/getIsDevMode'

export default class TeleprompterPlugin extends Plugin {
  settings: Record<string, any> = {}

  async onload() {
    await this.loadSettings()

    this.updateContent()
    const updateContentDebounced = debounce(this.updateContent.bind(this), 300)

    this.registerEvent(this.app.vault.on('modify', updateContentDebounced))
    this.registerEvent(
      this.app.workspace.on('active-leaf-change', () => {
        if (usePinNoteFeature().useStore().value) return
        updateContentDebounced()
      }),
    )

    this.addRibbonIcon('scroll', APP_NAME, () => {
      this.activateView()
    })

    this.addSettingTab(new SettingTab(this.app, this))

    await this.registerFeatures()
    this.registerView(VIEW_TYPE, (leaf) => new TeleprompterView(leaf))

    if (getIsDevMode()) {
      this.app.setting.openTabById(APP_ID)
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  async activateView(placement?: 'sidebar' | 'tab' | 'window') {
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE)

    if (placement && leaves.length > 0) {
      this.app.workspace.detachLeavesOfType(VIEW_TYPE)
    }

    if (placement || leaves.length === 0) {
      const leaf =
        !placement || placement === 'sidebar'
          ? this.app.workspace.getRightLeaf(false)
          : this.app.workspace.getLeaf(placement)

      await leaf.setViewState({
        type: VIEW_TYPE,
        active: true,
      })
    }

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(VIEW_TYPE)[0],
    )
  }

  updateContent() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView)
    const content = view?.getViewData()
    if (content) useContentFeature().useStore().content = content
  }

  async registerFeatures() {
    const debouncedSaveSettings = debounce(
      () => this.saveSettings(),
      100,
      false,
    )
    await loadFeatures({
      persist: (id: string, state: any) => {
        this.settings[id] = state
        debouncedSaveSettings()
      },
      restore: (id: string) => this.settings[id],
    })

    useOpenSettingsFeature().addEventListener('click', () => {
      this.app.setting.open()
      this.app.setting.openTabById('teleprompter')
    })

    const commandFeature = useCommandFeature()
    commandFeature.use({
      id: 'plugin',
      defaults: {
        list: [],
      },
      state: {
        list: [
          {
            id: 'plugin:open-in-sidebar',
            name: 'Open in Sidebar',
            callback: () => this.activateView('sidebar'),
          },
          {
            id: 'plugin:open-in-new-tab',
            name: 'Open in New Tab',
            callback: () => this.activateView('tab'),
          },
          {
            id: 'plugin:open-in-new-window',
            name: 'Open in New Window',
            callback: () => this.activateView('window'),
          },
        ],
      },
    })
    const { list: commands } = toRefs(commandFeature.useStore())
    watchEffect(() => commands.value.forEach((c) => this.addCommand(c)))

    initDefaultPanels()
  }
}
