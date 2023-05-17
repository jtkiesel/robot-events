import type {AxiosInstance} from 'axios';
import {Cursor} from '../cursor.js';
import type {Paginated} from './clients/index.js';

export abstract class Client {
  public constructor(private readonly axiosInstance: AxiosInstance) {}

  protected async get<T>(path: string, params?: object) {
    const response = await this.axiosInstance.get<T>(path, {params});
    return response.data;
  }

  protected getAll<T>(path: string, params?: object) {
    return new RobotEventsCursor<T>(page =>
      this.get(path, page ? {...params, page} : params)
    );
  }
}

export class RobotEventsCursor<T> extends Cursor<T> {
  private readonly values: T[] = [];
  private currentPage = 0;
  private isLastPage = false;

  public constructor(
    private readonly findPage: (page: number) => Promise<Paginated<T>>
  ) {
    super();
  }

  public override async hasNext() {
    if (this.currentPage === 0) {
      this.values.push(...(await this.nextPage()));
    }
    return this.values.length > 0 || !this.isLastPage;
  }

  public override async next(): Promise<T> {
    if (!this.values.length && !this.isLastPage) {
      this.values.push(...(await this.nextPage()));
    }
    const next = this.values.shift();
    if (!next) {
      throw new Error('No elements remaining in cursor');
    }
    return next;
  }

  private async nextPage() {
    if (this.values.length) {
      return this.values.splice(0);
    }
    if (this.isLastPage) {
      throw new Error('No elements remaining in cursor');
    }
    const {
      data,
      meta: {current_page, last_page},
    } = await this.findPage(++this.currentPage);

    this.isLastPage = current_page === last_page;

    return data;
  }
}
