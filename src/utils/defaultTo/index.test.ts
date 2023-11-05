import { test, describe, expect } from 'vitest'
import { defaultTo } from './index'

describe('defaultTo', () => {
  test('should return the default value when the provided value is undefined', () => {
    expect(defaultTo(undefined, 'bar')).toBe('bar')
    expect(defaultTo(undefined, () => 'bar')).toBe('bar')
  })

  test('should return the default value when the provided value is a function that returns undefined', () => {
    expect(defaultTo(() => undefined, 'bar')).toBe('bar')
    expect(
      defaultTo(
        () => undefined,
        () => 'bar',
      ),
    ).toBe('bar')
  })

  test('should return the provided value when it is not undefined', () => {
    expect(defaultTo('foo', 'bar')).toBe('foo')
    expect(defaultTo(() => 'foo', 'bar')).toBe('foo')
  })

  test('should return the provided value when it is null', () => {
    expect(defaultTo(null, 'bar')).toBe(null)
    expect(defaultTo(() => null, 'bar')).toBe(null)
  })

  test('should return the default value when the provided value is a function that throws an error', () => {
    expect(
      defaultTo(() => {
        throw new Error('Error')
      }, 'bar'),
    ).toBe('bar')

    expect(
      defaultTo(
        () => {
          throw new Error('Error')
        },
        () => 'bar',
      ),
    ).toBe('bar')
  })
})
