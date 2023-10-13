import { type InjectionKey, inject, provide } from 'vue'

/**
 * Create global state that can be injected into components.
 *
 * This is a modified version of the same package in vueuse.
 * The difference is that in this version you don't get the
 * ```
 * [Vue warn]: injection "Symbol(InjectionState)" not found.
 * ```
 * warning when you try to inject the state before it has been
 * provided. It's achieved by providing `undefined` as the default value
 * for the injection.
 *
 * @see https://vueuse.org/createInjectionState
 */
export function createInjectionState<Arguments extends Array<any>, Return>(
  composable: (...args: Arguments) => Return,
): readonly [
  useProvidingState: (...args: Arguments) => Return,
  useInjectedState: () => Return | undefined,
] {
  const key: string | InjectionKey<Return> = Symbol('InjectionState')
  const useProvidingState = (...args: Arguments) => {
    const state = composable(...args)
    provide(key, state)
    return state
  }
  const useInjectedState = () => inject(key, undefined)
  return [useProvidingState, useInjectedState]
}
