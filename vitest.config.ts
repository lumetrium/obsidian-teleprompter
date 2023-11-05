import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [...configDefaults.exclude],
    hookTimeout: 20000,
    testTimeout: 20000,
  },
})
