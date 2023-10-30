
export const Platform = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  WEB: 'web',
} as const

export type PlatformType = typeof Platform[keyof typeof Platform]
