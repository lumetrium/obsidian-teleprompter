import { defineFeature } from '@/features/feature'
import { computed } from 'vue'
import { usePluggable } from '@/hooks/usePluggable/usePluggable'
import type { CommandsOptions, CommandsState } from '@/features/commands/types'
import { flatten } from 'lodash'

export const useCommandFeature = defineFeature('command', (id) => {
  const { use, pluginsList } = usePluggable<CommandsState, CommandsOptions>()

  const list = computed(() =>
    flatten(pluginsList.value.map((group) => group.state.list)),
  )

  return {
    use,
    useStore: () => ({
      list,
    }),
    persist: false,
  }
})
