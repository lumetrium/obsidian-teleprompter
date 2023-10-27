import { loadFeatures } from '@/features/loader'
import { debounce, MarkdownView, Plugin } from 'obsidian'
import { useOpenSettingsFeature } from './features/open-settings'
import { SettingTab } from './setting-tab'
import { TeleprompterView } from './view'
import { useCommandFeature } from '@/features/commands'
import { toRefs, watch, watchEffect } from 'vue'
import { useContentFeature } from '@/features/content'
import { usePinNoteFeature } from '@/features/pin-note'
import { APP_ID, APP_NAME, VIEW_TYPE } from '@/constants'
import { initDefaultPanels } from '@/init/initDefaultPanels'
import { getIsDevMode } from '@/utils/getIsDevMode'
import { useDetachWindowFeature } from '@/features/detach-window'

export default class TeleprompterPlugin extends Plugin {
  settings: Record<string, any> = {}

  unloadQueue: (() => void)[] = []

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

  async onunload() {
    this.unloadQueue.forEach((u) => u())
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

    this.initCommands()
    this.initOpenSettings()
    this.initDetachWindow()

    initDefaultPanels()
  }

  private initOpenSettings() {
    const setting = this.app.setting
    const openSettingsFeature = useOpenSettingsFeature()
    function handler() {
      setting.open()
      setting.openTabById('teleprompter')
    }

    openSettingsFeature.addEventListener('click', handler)

    this.unloadQueue.push(() =>
      openSettingsFeature.removeEventListener('click', handler),
    )
  }

  private initCommands() {
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
            name: 'Open in sidebar',
            callback: () => this.activateView('sidebar'),
          },
          {
            id: 'plugin:open-in-new-tab',
            name: 'Open in new tab',
            callback: () => this.activateView('tab'),
          },
          {
            id: 'plugin:open-in-new-window',
            name: 'Open in new window',
            callback: () => this.activateView('window'),
          },
        ],
      },
    })
    const { list: commands } = toRefs(commandFeature.useStore())

    this.unloadQueue.push(
      watchEffect(() => commands.value.forEach((c) => this.addCommand(c))),
    )
  }

  private initDetachWindow() {
    const detachWindowStore = useDetachWindowFeature().useStore()
    const unwatch = watch(
      () => detachWindowStore.value,
      (value) => {
        if (value && !isDetached()) this.activateView('window')
        else if (!value && isDetached()) this.activateView('sidebar')
      },
    )

    const update = debounce(
      () => (detachWindowStore.value = isDetached()),
      300,
      true,
    )

    this.app.workspace.on('window-open', update)
    this.app.workspace.on('window-close', update)

    this.unloadQueue.push(
      unwatch,
      () => this.app.workspace.off('window-open', update),
      () => this.app.workspace.off('window-close', update),
    )
    function isDetached() {
      return window !== activeWindow
    }

    update()
  }
}
