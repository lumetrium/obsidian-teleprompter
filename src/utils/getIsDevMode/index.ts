
export function getIsDevMode(): boolean {
  return import.meta.env.MODE === 'development'
}