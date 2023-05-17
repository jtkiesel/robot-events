import type { ObjectBuilder } from '../builders.js';

export abstract class PageableRequestBuilder<
  T extends PageableRequest,
  B extends PageableRequestBuilder<any, any>
> implements ObjectBuilder<T>
{
  #page?: number;
  #perPage?: number;

  public page(value: number) {
    this.#page = value;
    return this as unknown as B;
  }

  public perPage(value: number) {
    this.#perPage = value;
    return this as unknown as B;
  }

  public abstract build(): T;

  public static PageableRequest = class {
    public readonly page?: number;
    public readonly perPage?: number;

    public constructor(builder: PageableRequestBuilder<any, any>) {
      this.page = builder.#page;
      this.perPage = builder.#perPage;
    }

    public params(): PageableParams {
      return {page: this.page, per_page: this.perPage};
    }
  };
}

export class PageableRequest extends PageableRequestBuilder.PageableRequest {}

export interface PageableParams {
  page?: number;
  per_page?: number;
}
