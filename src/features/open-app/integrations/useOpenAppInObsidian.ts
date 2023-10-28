import type { App } from 'obsidian'
import { useCommandFeature } from '@/features/commands'
import { activateViewInObsidian } from '@/utils/activateViewInObsidian'

export function useOpenAppInObsidian(options: { app: App; viewType: string }): {
  unload: () => void
} {
  const activateView = activateViewInObsidian.bind(
    null,
    options.viewType,
    options.app.workspace,
  )

  useCommandFeature().use('open-app', [
    {
      id: 'open-app:sidebar',
      name: 'Open in sidebar',
      callback: () => activateView('sidebar'),
    },
    {
      id: 'open-app:new-tab',
      name: 'Open in new tab',
      callback: () => activateView('tab'),
    },
    {
      id: 'open-app:new-window',
      name: 'Open in new window',
      callback: () => activateView('window'),
    },
  ])

  return {
    unload() {},
  }
}
