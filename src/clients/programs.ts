import type {Program} from '.';
import {Client} from '../client';
import type {Cursor} from '../cursor';
import {
  PageableParams,
  PageableRequest,
  PageableRequestBuilder,
} from '../pageable';
import type {ObjectBuilder} from '../builders';

export class Programs extends Client {
  public findAll(
    request?: (
      builder: ProgramsRequestBuilder
    ) => ObjectBuilder<ProgramsRequest>
  ): Cursor<Program> {
    return this.getAll(
      '/programs',
      request?.(new ProgramsRequestBuilder()).build().params()
    );
  }

  public async findById(id: number): Promise<Program> {
    return this.get(`/programs/${id}`);
  }
}

export class ProgramsRequestBuilder extends PageableRequestBuilder<ProgramsRequestBuilder> {
  #ids?: number[];

  public ids(...value: number[]) {
    this.#ids = value;
    return this;
  }

  public build() {
    return new ProgramsRequest(this);
  }

  public static ProgramsRequest = class extends PageableRequest {
    public readonly ids?: number[];

    public constructor(builder: ProgramsRequestBuilder) {
      super(builder);
      this.ids = builder.#ids;
    }

    public params(): ProgramsParams {
      return {...super.params(), id: this.ids};
    }
  };
}

export class ProgramsRequest extends ProgramsRequestBuilder.ProgramsRequest {}

interface ProgramsParams extends PageableParams {
  id?: number[];
}
