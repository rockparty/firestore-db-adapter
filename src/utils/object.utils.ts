/* eslint-disable @typescript-eslint/no-explicit-any */

export function clone<T>(obj: T): T {
  return { ...Object(obj) }
}

export function keys<T extends any>(obj: T): Array<keyof T> {
  return Object.keys(obj as any) as Array<keyof T>
}

export function pick<T extends any, P extends Array<keyof T>>(
  obj: T,
  ...props: P
): Pick<T, P extends Array<infer U> ? U : never> {
  return props.reduce(
    (picked, key) => ({ ...picked, [key]: obj[key] }),
    {},
  ) as Pick<T, P extends Array<infer U> ? U : never>
}

export function omit<T, P extends Array<keyof T>>(
  obj: T,
  ...omit: P
): Omit<T, P extends Array<infer U> ? U : never> {
  return keys(obj).reduce(
    (picked, key) =>
      omit.includes(key) ? picked : { ...picked, [key]: obj[key] },
    {},
  ) as Omit<T, P extends Array<infer U> ? U : never>
}

export function isTruthy<T>(obj: T): boolean {
  return obj !== undefined && obj !== null
}

export function compare<T1, T2>(obj1: T1, obj2: T2): boolean {
  for (const key of keys(obj1)) {
    if (!(key in obj2) || obj1[key] !== (obj2 as unknown as T1)[key]) {
      return false
    }
  }
  return true
}

export function equals<T1, T2>(obj1: T1, obj2: T2): boolean {
  const isObj1Truthy = isTruthy(obj1)
  const isObj2Truthy = isTruthy(obj2)

  if (!isObj1Truthy && !isObj2Truthy) return true

  if (!compare(obj1, obj2)) return false
  if (!compare(obj2, obj1)) return false

  return true
}
