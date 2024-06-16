import type { App, ObsidianProtocolHandler, Workspace } from 'obsidian'
import { useCommandFeature } from '@/features/commands'
import {
  activateViewInObsidian,
  type Placement,
} from '@/utils/activateViewInObsidian'
import { APP_ID } from '@/constants'
import { usePinNoteFeature } from '@/features/pin-note'
import { useContentFeature } from '@/features/content'
import { usePlayFeature } from '@/features/play'
import { ObsidianFileSelectModal } from '@/utils/obsidianFileSelectModal'
import { ObsidianTextareaModal } from '@/utils/obsidianTextareaModal'
import { usePublicApiRegistry } from '@/utils/usePublicApiRegistry'
import { useCountdownFeature } from '@/features/countdown'

type BooleanLike = boolean | string | ('0' | 'false' | 'no' | 'off')

export interface OpenAppParams {
  placement?: Placement
  file?: string
  content?: string
  pin?: BooleanLike
  play?: BooleanLike
  countdown?: string | number
}

export function useOpenAppInObsidian(options: { app: App; viewType: string }): {
  unload: () => void
} {
  const { app, viewType } = options
  const eventName = `${APP_ID}:open`

  const workspace = app.workspace as Workspace & {
    registerObsidianProtocolHandler: (
      action: string,
      handler: ObsidianProtocolHandler,
    ) => void
    unregisterObsidianProtocolHandler: (action: string) => void
  }

  const activateView = activateViewInObsidian.bind(null, viewType, workspace)
  const updateContent = useContentFeature().useStore().updateContent

  async function openWithParams(params: OpenAppParams = {}) {
    const falsy = [false, 0, 'false', 'no', 'off', '0']
    const { placement, file: filepath, content, pin, play, countdown } = params

    if (content) {
      updateContent(params.content)
    } else if (filepath) {
      const file =
        app.vault.getFileByPath(filepath) ??
        app.vault.getFileByPath(`${filepath}.md`)

      if (file) {
        updateContent(await app.vault.cachedRead(file))
      } else {
        console.error(`[${eventName}] File not found: "${filepath}"`)
      }
    }

    activateView(placement as Placement)

    if (countdown !== undefined) {
      useCountdownFeature().useStore().value = +countdown
    }

    if (pin !== undefined) {
      usePinNoteFeature().useStore().value = !falsy.includes(pin)
    }

    if (play !== undefined) {
      usePlayFeature().useStore().value = !falsy.includes(play)
    }
  }

  async function openFile(params: OpenAppParams) {
    const modal = new ObsidianFileSelectModal(app)
    return openWithParams({ ...params, file: await modal.prompt() })
  }

  async function openText(params: OpenAppParams) {
    const modal = new ObsidianTextareaModal(app)
    return openWithParams({ ...params, content: await modal.prompt() })
  }

  workspace.unregisterObsidianProtocolHandler(eventName)
  workspace.registerObsidianProtocolHandler(
    eventName,
    openWithParams as ObsidianProtocolHandler,
  )

  usePublicApiRegistry().register({
    open: openWithParams,
    close: () => workspace.detachLeavesOfType(viewType),
  })

  useCommandFeature().use('open-app', [
    {
      id: 'open-app:sidebar',
      name: 'Open in sidebar',
      callback: () => activateView('sidebar'),
    },
    {
      id: 'open-app:sidebar:file',
      name: 'Open file in sidebar and pin it',
      callback: () => openFile({ placement: 'sidebar', pin: true }),
    },
    {
      id: 'open-app:sidebar:text',
      name: 'Open arbitrary text in sidebar and pin it',
      callback: () => openText({ placement: 'sidebar', pin: true }),
    },

    {
      id: 'open-app:new-tab',
      name: 'Open in new tab',
      callback: () => activateView('tab'),
    },
    {
      id: 'open-app:new-tab:file',
      name: 'Open file in new tab and pin it',
      callback: () => openFile({ placement: 'tab', pin: true }),
    },
    {
      id: 'open-app:new-tab:text',
      name: 'Open arbitrary text in new tab and pin it',
      callback: () => openText({ placement: 'tab', pin: true }),
    },

    {
      id: 'open-app:new-window',
      name: 'Open in new window',
      callback: () => activateView('window'),
    },
    {
      id: 'open-app:new-window:file',
      name: 'Open file in new window and pin it',
      callback: () => openFile({ placement: 'window', pin: true }),
    },
    {
      id: 'open-app:new-window:text',
      name: 'Open arbitrary text in new window and pin it',
      callback: () => openText({ placement: 'window', pin: true }),
    },
  ])

  return {
    unload() {
      workspace.unregisterObsidianProtocolHandler(eventName)
    },
  }
}
