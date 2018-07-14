export class Variable<T> {
  constructor(v: T)
  timestamp: number
  get(): T
  set(v: T): void
}

export function createComputed<T>(f: () => void): (() => T)
export function observe(f: () => void): (() => void)
