type Prefix<P, T extends object> = {
  [K in keyof T as `${Extract<P, string>}.${Extract<K, string>}`]: T[K]
}

export type Flatten<T extends object> = Extract<
  {
    [K in keyof T]-?: (
      x: (Extract<T[K], object> extends never
        ? unknown
        : Prefix<K, Flatten<Extract<T[K], object>>>) &
        (Exclude<T[K], object> extends never
          ? unknown
          : Pick<{ [K in keyof T]: Exclude<T[K], object> }, K>)
    ) => void
  }[keyof T] extends (x: infer I) => void
    ? I
    : never,
  object
> extends infer O
  ? { [K in keyof O]: O[K] }
  : never
