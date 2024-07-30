import type { App } from 'obsidian'
import { useOpenSettingsFeature } from '@/features/open-settings'
import { APP_ID } from '@/constants'

export function useOpenSettingsInObsidian(options: { app: App }): {
  unload: () => void
} {
  const { app } = options

  const openSettingsFeature = useOpenSettingsFeature()
  const setting = (app as any).setting

  function handler() {
    setting.open()
    setting.openTabById(APP_ID)
  }

  openSettingsFeature.addEventListener('click', handler)

  return {
    unload() {
      openSettingsFeature.removeEventListener('click', handler)
    },
  }
}
