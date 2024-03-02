import { defineFeature } from '@/features/feature'
import { computed, type MaybeRef } from 'vue'
import { usePluggable } from '@/hooks/usePluggable/usePluggable'
import type { CommandsOptions, CommandsState } from '@/features/commands/types'
import type { Command } from '@/features/commands/types'
import { flatten } from 'lodash'

export const useCommandFeature = defineFeature('command', (id) => {
  const { use, pluginsList } = usePluggable<CommandsState, CommandsOptions>()

  const list = computed(() =>
    flatten(pluginsList.value.map((group) => group.state.list)),
  )

  return {
    use(id: string, list: MaybeRef<Command[]>) {
      return use({ id, defaults: { list: [] }, state: { list } })
    },
    useStore: () => ({
      list,
    }),
    persist: false,
  }
})
