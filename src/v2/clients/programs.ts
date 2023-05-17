import type {ObjectBuilder} from '../../builders.js';
import {Client} from '../client.js';
import {
  PageableRequest,
  PageableRequestBuilder,
  type PageableParams,
} from '../pageable.js';
import type {Program} from './index.js';

export class ProgramsClient extends Client {
  public findAll(
    request?: (
      builder: ProgramsRequestBuilder
    ) => ObjectBuilder<ProgramsRequest>
  ) {
    return this.getAll<Program>(
      '/programs',
      request?.(new ProgramsRequestBuilder()).build().params()
    );
  }

  public async findById(id: number) {
    return this.get<Program>(`/programs/${id}`);
  }
}

export class ProgramsRequestBuilder extends PageableRequestBuilder<
  ProgramsRequest,
  ProgramsRequestBuilder
> {
  #ids?: number[];

  public ids(...value: number[]) {
    this.#ids = value;
    return this;
  }

  public override build() {
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
