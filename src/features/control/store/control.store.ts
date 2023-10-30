import { useControlFeature } from '@/features/control'
import {
  computed,
  type ComputedRef,
  type MaybeRef,
  type UnwrapNestedRefs,
  type WritableComputedRef,
} from 'vue'
import type { ControlState, PluggableControl } from '@/features/control/types'
import type { Modify } from '@/utils/utility-types'
import { createInjectionState } from '@/utils/createInjectionState'
import { unref } from 'vue'
import { useControlComponents } from '@/features/control/hooks/useControlComponents'
import cloneDeep from 'lodash/cloneDeep'

type TypedSettingItemStore<State> = Modify<
  ReturnType<typeof useDefaultControlStore>,
  {
    state: WritableComputedRef<UnwrapNestedRefs<State>>
    defaults: ComputedRef<UnwrapNestedRefs<State>>
  }
>

const [useProvideControlStore, useDefaultControlStore] = createInjectionState(
  (idOrControl: string | MaybeRef<PluggableControl>) => {
    const store = useControlFeature().useStore()
    const control = computed(() =>
      typeof idOrControl === 'string'
        ? store.plugins[idOrControl]
        : unref(idOrControl),
    )

    const state = computed({
      get: () => control.value?.state,
      set: (value) => {
        control.value.state = value
      },
    })

    function reset() {
      state.value.value = cloneDeep(state.value.resetValue)
    }

    return {
      control,
      id: control.value.id,
      icon: computed(() => control.value?.icon),
      type: computed(() => control.value.type),
      disabled: computed(() => control.value.disabled),
      defaults: computed(() => control.value.defaults),
      state,
      components: useControlComponents(control),
      reset,
    }
  },
)

function useControlStore<State = ControlState>() {
  return useDefaultControlStore() as TypedSettingItemStore<State>
}

export { useProvideControlStore, useControlStore }
