const registry = new Map<string, unknown>()

export function usePublicApiRegistry() {
  function addToRegistry(name: string, value: unknown) {
    if (registry.has(name)) throw new Error(`${name} is already registered.`)
    registry.set(name, value)
  }

  /**
   * Register a single or multiple public APIs
   * @param nameOrList
   * @param value
   * @example register('doIt', () => console.log('done'))
   * @example register({ doIt: () => console.log('done'), undoIt: () => console.log('undone') })
   */
  function register(
    nameOrList: string | Record<string, unknown>,
    value?: unknown,
  ) {
    if (typeof nameOrList === 'string') {
      addToRegistry(nameOrList, value)
    } else {
      for (const [name, value] of Object.entries(nameOrList)) {
        addToRegistry(name, value)
      }
    }
  }

  /**
   * Get a public API by name
   * @param name
   * @example get<() => void>('doIt')
   */
  function get<T>(name: string): T {
    return registry.get(name) as T
  }

  /**
   * List all public APIs
   */
  function list() {
    return Object.fromEntries(registry.entries())
  }

  return {
    register,
    get,
    list,
  }
}
