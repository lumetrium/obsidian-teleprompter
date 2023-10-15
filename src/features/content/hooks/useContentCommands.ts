import { computed } from 'vue'
import { flatten } from 'lodash'
import type { Command } from '@/features/commands/types'
import { useContentFeature } from '@/features/content'

export function useContentCommands() {
  const commands = computed(() => getCommands())

  function getCommands(): Command[] {
    return flatten([...getScrollCommands()])
  }

  function getScrollCommands(): Command[] {
    const store = useContentFeature().useStore()
    return [
      {
        id: 'content:scroll-up',
        name: 'Scroll up 50 pixels',
        callback: () => store.requestToScrollBy(-50),
      },
      {
        id: 'content:scroll-down',
        name: 'Scroll down 50 pixels',
        callback: () => store.requestToScrollBy(50),
      },
      {
        id: 'content:scroll-to-top',
        name: 'Scroll to top',
        callback: () => store.requestToScrollBy(-store.contentScrollHeight),
      },
      {
        id: 'content:scroll-to-bottom',
        name: 'Scroll to bottom',
        callback: () => store.requestToScrollBy(store.contentScrollHeight),
      },
    ]
  }

  return {
    commands,
  }
}
