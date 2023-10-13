import type { UnwrapNestedRefs } from 'vue'

export interface FeatureSetupReturnType<State, Actions> {
  useStore?: () => State & Actions
  persist?: FeatureStorePersistOptions<State> | false
}
export type FeatureSetup<F, State, Actions> = (
  id: string,
) => F & FeatureSetupReturnType<State, Actions>

export type FeatureEventListener = () => void

export type FeatureEvents = {
  addEventListener: (event: string, listener: FeatureEventListener) => void
  removeEventListener: (event: string, listener: FeatureEventListener) => void
}

export type Feature<
  F extends FeatureSetupReturnType<S, A>,
  S = Record<string, unknown>,
  A = Record<string, Function>,
  ID extends string = string,
> = {
  [K in keyof F]: K extends 'useStore'
    ? () => UnwrapNestedRefs<ReturnType<F['useStore']>>
    : F[K]
} & { id: ID } & FeatureSetupReturnType<S, A> &
  FeatureEvents

export interface FeatureStorePersistOptions<State, PersistedState = any> {
  reduce?: (state: State) => PersistedState
  merge?: (state: State, savedState: PersistedState) => Partial<State>
}

export type FeatureDebugOptions = 'persistence'

export interface FeatureLoadOptions<S = any> {
  debug?: { [featureId: string]: FeatureDebugOptions[] }
  persist: (featureId: string, state: S) => void
  restore: (featureId: string) => S
}
