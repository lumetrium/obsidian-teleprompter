import { usePanelFeature } from '@/features/panel'
import { useControlFeature } from '@/features/control'
import { PanelAlignment, PanelLocation } from '@/features/panel/constants'
import { usePagemapFeature } from '@/features/pagemap'
import { usePlayFeature } from '@/features/play'
import { usePinNoteFeature } from '@/features/pin-note'
import { useSpeedFeature } from '@/features/speed'
import { useTextColorFeature } from '@/features/text-color'
import { useBgColorFeature } from '@/features/bg-color'
import { useLetterSpacingFeature } from '@/features/letter-spacing'
import { useLineHeightFeature } from '@/features/line-height'
import { useOpenSettingsFeature } from '@/features/open-settings'
import { useContentFeature } from '@/features/content'
import { useFontFamilyFeature } from '@/features/font-family'
import { useFontSizeFeature } from '@/features/font-size'
import { usePaddingFeature } from '@/features/padding'
import { useFlipXFeature } from '@/features/flip/flip-x'
import { useFlipYFeature } from '@/features/flip/flip-y'
import type { PluggablePanel } from '@/features/panel/types'

export function initDefaultPanels() {
  const panelFeatureStore = usePanelFeature().useStore()
  const { setDefaultPanels, getPanelFromPlugin } = panelFeatureStore

  const controlPanelPlugin = panelFeatureStore.plugins[useControlFeature().id]
  const pagemapPanelPlugin = panelFeatureStore.plugins[usePagemapFeature().id]

  const controlPlugins = useControlFeature().useStore().plugins

  const playFeature = usePlayFeature()
  const pinNote = usePinNoteFeature()
  const speedFeature = useSpeedFeature()
  const bgColorFeature = useBgColorFeature()
  const textColorFeature = useTextColorFeature()
  const lineHeightFeature = useLineHeightFeature()
  const letterSpacingFeature = useLetterSpacingFeature()
  const paddingFeature = usePaddingFeature()
  const openSettingsFeature = useOpenSettingsFeature()
  const contentFeature = useContentFeature()
  const fontFamilyFeature = useFontFamilyFeature()
  const fontSizeFeature = useFontSizeFeature()
  const flipXFeature = useFlipXFeature()
  const flipYFeature = useFlipYFeature()

  const controlPanelItems = [
    controlPlugins[playFeature.id],
    controlPlugins[pinNote.id],
    controlPlugins[speedFeature.id],
    controlPlugins[fontSizeFeature.id],
    controlPlugins[lineHeightFeature.id],
    controlPlugins[letterSpacingFeature.id],
    controlPlugins[fontFamilyFeature.id],
    controlPlugins[paddingFeature.id],
    controlPlugins[flipXFeature.id],
    controlPlugins[flipYFeature.id],
    controlPlugins[textColorFeature.id],
    controlPlugins[bgColorFeature.id],
    controlPlugins[contentFeature.id],
    controlPlugins[openSettingsFeature.id],
  ]

  function createPanel(plugin: PluggablePanel, getState: () => object) {
    return getPanelFromPlugin(plugin, {
      state: getState(),
      defaults: getState(),
    })
  }

  setDefaultPanels([
    createPanel(controlPanelPlugin, () => ({
      name: 'Control panel',
      location: PanelLocation.TOP,
      items: controlPanelItems,
    })),
    createPanel(controlPanelPlugin, () => ({
      name: 'Control side-panel',
      location: PanelLocation.LEFT,
      alignment: PanelAlignment.CENTER,
      width: 250,
      isOpen: false,
      items: controlPanelItems,
    })),
    createPanel(pagemapPanelPlugin, () => ({
      name: 'Page minimap',
    })),
    createPanel(pagemapPanelPlugin, () => ({
      name: 'Page minimap extra',
      location: PanelLocation.LEFT,
      width: 80,
      isOpen: false,
    })),
  ])
}
