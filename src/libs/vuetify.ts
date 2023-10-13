import { createVuetify, type VuetifyOptions } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export interface AppVuetifyOptions {
  container?: Element | string
}
export function getVuetifyOptions(options: AppVuetifyOptions = {}) {
  const container =
    typeof options.container !== 'string'
      ? options.container
      : {
          // this is to avoid vuetify warning about missing container
          querySelector: () =>
            activeDocument.querySelector(options.container as string),
          appendChild: (child: Element) =>
            activeDocument
              .querySelector(options.container as string)
              ?.appendChild(child),
        }

  return {
    defaults: {
      global: {
        ripple: false,
      },
      VMenu: {
        transition: 'slide-y-transition',
        attach: container,
      },
      VTooltip: {
        transition: 'scale-transition',
        attach: container,
      },
      VTextField: {
        variant: 'plain',
        density: 'compact',
      },
      VSelect: {
        variant: 'plain',
        density: 'compact',
      },
      VOverlay: {
        attach: container,
      },
    },
    theme: false,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  } as VuetifyOptions
}

export function createVuetifyWithOptions(options: AppVuetifyOptions) {
  return createVuetify(getVuetifyOptions(options))
}
