export type Modify<T, R> = Omit<T, keyof R> & R

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
