import { test, describe, expect } from 'vitest'
import { genUniqueName } from './index'

describe('genUniqueName', () => {
  test('should return the provided name when there is no existing names', () => {
    expect(genUniqueName('Panel', [])).toBe('Panel')
  })

  test('should add "1" when the name already exists', () => {
    expect(genUniqueName('Panel', ['Panel'])).toBe('Panel 1')
  })

  test('should increment the highest number when there are multiple matching names', () => {
    expect(genUniqueName('Panel', ['Panel', 'Panel 1'])).toBe('Panel 2')
    expect(genUniqueName('Panel', ['Panel', 'Panel 84', 'Panel 56'])).toBe(
      'Panel 85',
    )
    expect(genUniqueName('Panel', ['Panel', 'Panel -84', 'Panel 56'])).toBe(
      'Panel 57',
    )
    expect(genUniqueName('Panel', ['Panel 125', 'Panel 56'])).toBe('Panel 126')
  })

  test('should properly handle special characters', () => {
    expect(genUniqueName('Button @2', [])).toBe('Button @2')
    expect(
      genUniqueName('Button #1', ['Button #1', 'Button #1 3', 'Button #2']),
    ).toBe('Button #1 4')
  })
})
