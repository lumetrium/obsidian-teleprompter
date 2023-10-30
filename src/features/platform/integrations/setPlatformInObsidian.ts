import { Platform as ObsidianPlatform } from 'obsidian'
import { Platform } from '@/features/platform/enums'
import { usePlatformFeature } from '@/features/platform'

export function setPlatformInObsidian() {
  const platform = usePlatformFeature()

  if (ObsidianPlatform.isMobileApp) {
    platform.setPlatform(Platform.MOBILE)
  } else if (ObsidianPlatform.isDesktopApp) {
    platform.setPlatform(Platform.DESKTOP)
  }
}
