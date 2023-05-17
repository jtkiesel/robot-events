export abstract class Cursor<T> {
  public abstract hasNext(): Promise<boolean>;

  public abstract next(): Promise<T>;

  public async forEach(iterator: (value: T) => void) {
    while (await this.hasNext()) {
      iterator(await this.next());
    }
  }

  public filter(predicate: (value: T) => boolean): Cursor<T> {
    return new FilteredCursor(this, predicate);
  }

  public map<U>(transform: (value: T) => U): Cursor<U> {
    return new TransformedCursor<U, T>(this, transform);
  }

  public flatMap<U>(transform: (value: T) => Cursor<U>): Cursor<U> {
    return new NestedCursor(this.map(transform));
  }

  public async toArray() {
    const values: T[] = [];
    await this.forEach(value => values.push(value));
    return values;
  }
}

export class FilteredCursor<T> extends Cursor<T> {
  private nextValue?: T;

  public constructor(
    private readonly cursor: Cursor<T>,
    private readonly filterFn: (value: T) => boolean
  ) {
    super();
  }

  public override async hasNext() {
    if (this.nextValue !== undefined) {
      return true;
    }
    while (await this.cursor.hasNext()) {
      const value = await this.cursor.next();
      if (this.filterFn(value)) {
        this.nextValue = value;
        return true;
      }
    }
    return false;
  }

  public override async next() {
    let value = this.nextValue;
    if (value !== undefined) {
      this.nextValue = undefined;
      return value;
    }
    do {
      value = await this.cursor.next();
    } while (!this.filterFn(value));
    return value;
  }
}

export class TransformedCursor<T, V> extends Cursor<T> {
  public constructor(
    private readonly cursor: Cursor<V>,
    private readonly transform: (value: V) => T
  ) {
    super();
  }

  public override async hasNext() {
    return await this.cursor.hasNext();
  }

  public override async next() {
    return this.transform(await this.cursor.next());
  }

  public override map<U>(transform: (value: T) => U): Cursor<U> {
    const oldTransform = this.transform;
    return new TransformedCursor(this.cursor, (value: V) =>
      transform(oldTransform(value))
    );
  }
}

export class NestedCursor<T> extends Cursor<T> {
  private innerCursor?: Cursor<T>;

  public constructor(private readonly cursor: Cursor<Cursor<T>>) {
    super();
  }

  public override async hasNext() {
    while (
      (await this.cursor.hasNext()) &&
      !(await this.innerCursor?.hasNext())
    ) {
      this.innerCursor = await this.cursor.next();
    }
    return this.innerCursor?.hasNext() ?? false;
  }

  public override async next() {
    if (!this.innerCursor) {
      throw new Error('No elements remaining in cursor');
    }
    return this.innerCursor.next();
  }
}

export class ArrayCursor<T> extends Cursor<T> {
  public constructor(private readonly values: T[]) {
    super();
  }

  public override async hasNext() {
    return this.values.length > 0;
  }

  public override async next(): Promise<T> {
    const next = this.values.shift();
    if (!next) {
      throw new Error('No elements remaining in cursor');
    }
    return next;
  }

  public override async toArray() {
    return this.values.splice(0);
  }
}
