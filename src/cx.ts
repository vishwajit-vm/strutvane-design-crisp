/**
 * A tiny class-name joiner, so slots can add a modifier class only when it applies.
 *
 * @module
 */

/**
 * Join the truthy class names with spaces.
 *
 * @example
 * cx('svc-button', primary && 'svc-button-primary', undefined) // 'svc-button svc-button-primary'
 */
export function cx(...names: readonly (string | false | null | undefined)[]): string {
  return names.filter((name): name is string => typeof name === 'string' && name !== '').join(' ')
}
