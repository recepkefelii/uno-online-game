export interface RandomCardType<T> {
    (enumObject: Record<string, T>): T;
  }