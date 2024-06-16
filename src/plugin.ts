import { loadFeatures } from '@/features/loader'
import { debounce, MarkdownView, Plugin } from 'obsidian'
import { SettingTab } from './setting-tab'
import { TeleprompterView } from './view'
import { useContentFeature } from '@/features/content'
import { usePinNoteFeature } from '@/features/pin-note'
import { APP_ID, APP_NAME, VIEW_TYPE } from '@/constants'
import { initDefaultPanels } from '@/init/initDefaultPanels'
import { getIsDevMode } from '@/utils/getIsDevMode'
import { useDetachWindowInObsidian } from '@/features/detach-window/integrations/useDetachWindowInObsidian'
import { activateViewInObsidian } from '@/utils/activateViewInObsidian'
import { useOpenAppInObsidian } from '@/features/open-app/integrations/useOpenAppInObsidian'
import { useOpenSettingsInObsidian } from '@/features/open-settings/integrations/useOpenSettingsInObsidian'
import { useCommandsObsidian } from '@/features/commands/integrations/useCommandsInObsidian'
import { setPlatformInObsidian } from '@/features/platform/integrations/setPlatformInObsidian'
import { usePublicApiRegistry } from '@/utils/usePublicApiRegistry'

export default class TeleprompterPlugin extends Plugin {
  settings: Record<string, any> = {}
  unloadQueue: (() => void)[] = []

  get api(): Record<string, unknown> {
    return usePublicApiRegistry().list()
  }

  async onload() {
    await this.loadSettings()

    this.applyVaultConfig()
    this.updateContent()
    const updateContentDebounced = debounce(this.updateContent.bind(this), 300)
    const updateContentDebouncedIfNotPinned = () => {
      if (usePinNoteFeature().useStore().value) return
      updateContentDebounced()
    }

    this.registerEvent(
      this.app.metadataCache.on('changed', updateContentDebouncedIfNotPinned),
    )
    this.registerEvent(
      this.app.workspace.on(
        'active-leaf-change',
        updateContentDebouncedIfNotPinned,
      ),
    )

    this.registerEvent(
      this.app.vault.on(
        'config-changed' as any,
        this.applyVaultConfig.bind(this),
      ),
    )

    this.addRibbonIcon('scroll', APP_NAME, () =>
      activateViewInObsidian(VIEW_TYPE, this.app.workspace),
    )

    this.addSettingTab(new SettingTab(this.app, this))

    await this.registerFeatures()
    this.registerView(VIEW_TYPE, (leaf) => new TeleprompterView(leaf))

    if (getIsDevMode()) {
      ;(this.app as any).setting.openTabById(APP_ID)
    }
  }

  applyVaultConfig() {
    const { config } = this.app.vault as any
    const propertiesVisibility = config.propertiesInDocument !== 'hidden'
    const contentStore = useContentFeature().useStore()
    if (contentStore.propertiesVisibility === propertiesVisibility) return
    contentStore.propertiesVisibility = propertiesVisibility
  }

  async onunload() {
    this.unloadQueue.forEach((u) => u())
    this.unloadQueue = []
  }

  async loadSettings() {
    this.settings = Object.assign({}, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  updateContent() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView)
    const content = view?.getViewData()
    if (content) useContentFeature().useStore().updateContent(content)
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

    setPlatformInObsidian()

    const app = this.app
    const viewType = VIEW_TYPE

    this.unloadQueue.push(
      useOpenAppInObsidian({ app, viewType }).unload,
      useOpenSettingsInObsidian({ app }).unload,
      useDetachWindowInObsidian({ app, viewType }).unload,
      useCommandsObsidian({ plugin: this }).unload,
    )

    initDefaultPanels()
  }
}
