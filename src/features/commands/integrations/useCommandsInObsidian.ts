import type { Plugin } from 'obsidian'
import { useCommandFeature } from '@/features/commands'
import { toRefs } from 'vue'
import { watchEffect } from 'vue'

export function useCommandsObsidian(options: { plugin: Plugin }): {
  unload: () => void
} {
  const { plugin } = options
  const commandFeature = useCommandFeature()
  const { list: commands } = toRefs(commandFeature.useStore())

  const unwatch = watchEffect(() =>
    commands.value.forEach((command) => plugin.addCommand(command)),
  )

  return {
    unload() {
      unwatch()
    },
  }
}
