import type { App } from 'obsidian'
import { useOpenSettingsFeature } from '@/features/open-settings'

export function useOpenSettingsInObsidian(options: { app: App }): {
  unload: () => void
} {
  const { app } = options

  const openSettingsFeature = useOpenSettingsFeature()
  const setting = (app as any).setting

  function handler() {
    setting.open()
    setting.openTabById('teleprompter')
  }

  openSettingsFeature.addEventListener('click', handler)

  return {
    unload() {
      openSettingsFeature.removeEventListener('click', handler)
    },
  }
}
