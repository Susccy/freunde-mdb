// this file provides helper functions used only during development

// https://stackoverflow.com/a/57683652/13575631
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
export type ExpandDeep<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandDeep<O[K]> }
    : never
  : T
