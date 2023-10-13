/**
 * Returns the first argument if it's not `undefined`, otherwise the second.
 * @param value
 * @param defaultValue
 * @example
 * defaultTo('foo', 'bar') // 'foo'
 * defaultTo(undefined, 'bar') // 'bar'
 * defaultTo(() => 'foo', 'bar') // 'foo'
 * defaultTo(() => undefined, 'bar') // 'bar'
 * defaultTo(() => undefined, () => 'bar') // 'bar'
 */
export function defaultTo<T>(
  value: T | (() => T),
  defaultValue?: T | (() => T),
): T | undefined {
  try {
    const result = resolve(value)
    return result === undefined ? resolve(defaultValue) : result
  } catch (e) {
    return resolve(defaultValue)
  }
}

function resolve<T>(value: T | (() => T)): T {
  return typeof value === 'function' ? (value as () => T)() : value
}
