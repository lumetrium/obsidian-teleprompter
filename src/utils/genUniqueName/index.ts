/**
 * Generate a unique name based on the default name and existing names.
 * @param defaultName
 * @param existingNames
 * @example
 * genUniqueName('Panel', []) // 'Panel'
 * genUniqueName('Panel', ['Panel']) // 'Panel 1'
 * genUniqueName('Panel', ['Panel', 'Panel 1']) // 'Panel 2'
 * genUniqueName('Panel', ['Panel', 'Panel 84', 'Panel 56']) // 'Panel 85'
 */
export function genUniqueName(
  defaultName: string,
  existingNames: string[],
): string {
  const nums = existingNames.map((name) => {
    const regex = new RegExp(`^${defaultName} (\\d+)$`, 'i')
    return +regex.exec(name)?.[1] || 0
  })

  const max = nums.length ? Math.max(...nums) : 0
  return !max && !existingNames.find((name) => name === defaultName)
    ? defaultName
    : `${defaultName} ${max + 1}`
}
