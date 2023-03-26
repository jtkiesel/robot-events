import type {Season} from '.';
import {Client} from '../client';
import type {Cursor} from '../cursor';
import {
  PageableParams,
  PageableRequest,
  PageableRequestBuilder,
} from '../pageable';
import type {ObjectBuilder} from '../builders';

export class Seasons extends Client {
  public findAll(
    request?: (builder: SeasonsRequestBuilder) => ObjectBuilder<SeasonsRequest>
  ): Cursor<Season> {
    return this.getAll(
      '/seasons',
      request?.(new SeasonsRequestBuilder()).build().params()
    );
  }

  public async findById(id: number): Promise<Season> {
    return this.get(`/seasons/${id}`);
  }
}

export class SeasonsRequestBuilder extends PageableRequestBuilder<SeasonsRequestBuilder> {
  #ids?: number[];
  #programIds?: number[];
  #teamIds?: number[];
  #start?: Date;
  #end?: Date;
  #active?: boolean;

  public ids(...value: number[]) {
    this.#ids = value;
    return this;
  }

  public programIds(...value: number[]) {
    this.#programIds = value;
    return this;
  }

  public teamIds(...value: number[]) {
    this.#teamIds = value;
    return this;
  }

  public start(value: Date) {
    this.#start = value;
    return this;
  }

  public end(value: Date) {
    this.#end = value;
    return this;
  }

  public active(value: boolean) {
    this.#active = value;
    return this;
  }

  public build() {
    return new SeasonsRequest(this);
  }

  public static SeasonsRequest = class extends PageableRequest {
    public readonly ids?: number[];
    public readonly programIds?: number[];
    public readonly teamIds?: number[];
    public readonly start?: Date;
    public readonly end?: Date;
    public readonly active?: boolean;

    public constructor(builder: SeasonsRequestBuilder) {
      super(builder);
      this.ids = builder.#ids;
      this.programIds = builder.#programIds;
      this.teamIds = builder.#teamIds;
      this.start = builder.#start;
      this.end = builder.#end;
      this.active = builder.#active;
    }

    public params(): SeasonsParams {
      return {
        ...super.params(),
        id: this.ids,
        program: this.programIds,
        team: this.teamIds,
        start: this.start,
        end: this.end,
        active: this.active,
      };
    }
  };
}

export class SeasonsRequest extends SeasonsRequestBuilder.SeasonsRequest {}

interface SeasonsParams extends PageableParams {
  id?: number[];
  program?: number[];
  team?: number[];
  start?: Date;
  end?: Date;
  active?: boolean;
}
