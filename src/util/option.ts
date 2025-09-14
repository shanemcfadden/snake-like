export type Option<T> = Some<T> | None<T>;

interface IOption<T> {
  andThen<U>(f: (value: T) => Option<U>): Option<U>;

  filter<U extends T>(predicate: (value: T) => value is U): Option<U>;
  filter(predicate: (value: T) => boolean): Option<T>;

  map<U>(f: (value: T) => U): Option<U>;

  orElse(f: () => Option<T>): Option<T>;

  unwrap(): T | null;

  unwrapOrElse(defaultValue: T): T;
}

export const fromNullable = <T>(value: T | null | undefined): Option<T> =>
  value == null ? new None<T>() : new Some<T>(value);
export const none = <T>(): Option<T> => new None<T>();
export const some = <T>(value: T): Option<T> => new Some(value);

class Some<T> implements IOption<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  andThen<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    return predicate(this.value) ? this : new None<T>();
  }

  map<U>(f: (value: T) => U): Option<U> {
    return new Some<U>(f(this.value));
  }

  orElse<T>(): Option<T> {
    return this as unknown as Option<T>;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOrElse(): T {
    return this.value;
  }
}

class None<T> implements IOption<T> {
  andThen<U>(): Option<U> {
    return new None<U>();
  }

  filter() {
    return new None<T>();
  }

  map<U>(): Option<U> {
    return new None<U>();
  }

  orElse(f: () => Option<T>): Option<T> {
    return f();
  }

  unwrap(): null {
    return null;
  }

  unwrapOrElse(defaultValue: T): T {
    return defaultValue;
  }
}
