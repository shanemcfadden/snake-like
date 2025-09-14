export type Option<T> = Some<T> | None<T>;

interface IOption<T> {
  map<U>(f: (value: T) => U): Option<U>;

  unwrap(): T | null;
}

export const some = <T>(value: T): Option<T> => new Some(value);
export const none = <T>(): Option<T> => new None();

class Some<T> implements IOption<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  map<U>(f: (value: T) => U): Option<U> {
    return new Some<U>(f(this.value));
  }

  unwrap(): T {
    return this.value;
  }
}

class None<T> implements IOption<T> {
  map<U>(_: (value: T) => U): Option<U> {
    return new None<U>();
  }

  unwrap(): null {
    return null;
  }
}
