import type {ObjectBuilder} from '../../builders.js';
import {Client} from '../client.js';
import {
  PageableRequest,
  PageableRequestBuilder,
  type PageableParams,
} from '../pageable.js';
import type {Grade, Team} from './index.js';

export class TeamsClient extends Client {
  public findAll(
    request?: (builder: TeamsRequestBuilder) => ObjectBuilder<TeamsRequest>
  ) {
    return this.getAll<Team>(
      '/teams',
      request?.(new TeamsRequestBuilder()).build().params()
    );
  }

  public findAllByEvent(
    request: (
      builder: EventTeamsRequestBuilder
    ) => ObjectBuilder<EventTeamsRequest>
  ) {
    const req = request(new EventTeamsRequestBuilder()).build();
    return this.getAll<Team>(`/events/${req.eventId}/teams`, req.params());
  }

  public async findById(id: number) {
    return this.get<Team>(`/teams/${id}`);
  }
}

export class TeamsRequestBuilder extends PageableRequestBuilder<
  TeamsRequest,
  TeamsRequestBuilder
> {
  #ids?: number[];
  #numbers?: string[];
  #eventIds?: number[];
  #registered?: boolean;
  #programIds?: number[];
  #grades?: Grade[];
  #countries?: string[];
  #mine?: boolean;

  public ids(...value: number[]) {
    this.#ids = value;
    return this;
  }

  public numbers(...value: string[]) {
    this.#numbers = value;
    return this;
  }

  public eventIds(...value: number[]) {
    this.#eventIds = value;
    return this;
  }

  public registered(value: boolean) {
    this.#registered = value;
    return this;
  }

  public programIds(...value: number[]) {
    this.#programIds = value;
    return this;
  }

  public grades(...value: Grade[]) {
    this.#grades = value;
    return this;
  }

  public countries(...value: string[]) {
    this.#countries = value;
    return this;
  }

  public mine(value: boolean) {
    this.#mine = value;
    return this;
  }

  public override build(): TeamsRequest {
    return new TeamsRequest(this);
  }

  public static TeamsRequest = class extends PageableRequest {
    public readonly ids;
    public readonly numbers;
    public readonly eventIds;
    public readonly registered;
    public readonly programIds;
    public readonly grades;
    public readonly countries;
    public readonly mine;

    public constructor(builder: TeamsRequestBuilder) {
      super(builder);
      this.ids = builder.#ids;
      this.numbers = builder.#numbers;
      this.eventIds = builder.#eventIds;
      this.registered = builder.#registered;
      this.programIds = builder.#programIds;
      this.grades = builder.#grades;
      this.countries = builder.#countries;
      this.mine = builder.#mine;
    }

    public params(): TeamsParams {
      return {
        ...super.params(),
        id: this.ids,
        number: this.numbers,
        event: this.eventIds,
        registered: this.registered,
        program: this.programIds,
        grade: this.grades,
        country: this.countries,
        myTeams: this.mine,
      };
    }
  };
}

export class TeamsRequest extends TeamsRequestBuilder.TeamsRequest {}

interface TeamsParams extends PageableParams {
  id?: number[];
  number?: string[];
  event?: number[];
  registered?: boolean;
  program?: number[];
  grade?: Grade[];
  country?: string[];
  myTeams?: boolean;
}

export class EventTeamsRequestBuilder extends PageableRequestBuilder<
  EventTeamsRequest,
  EventTeamsRequestBuilder
> {
  #eventId?: number;
  #numbers?: string[];
  #registered?: boolean;
  #grades?: Grade[];
  #countries?: string[];
  #mine?: boolean;

  public eventId(value: number) {
    this.#eventId = value;
    return this;
  }

  public numbers(...value: string[]) {
    this.#numbers = value;
    return this;
  }

  public registered(value: boolean) {
    this.#registered = value;
    return this;
  }

  public grades(...value: Grade[]) {
    this.#grades = value;
    return this;
  }

  public countries(...value: string[]) {
    this.#countries = value;
    return this;
  }

  public mine(value: boolean) {
    this.#mine = value;
    return this;
  }

  public override build() {
    return new EventTeamsRequest(this);
  }

  public static EventTeamsRequest = class extends PageableRequest {
    public readonly eventId: number;
    public readonly numbers?: string[];
    public readonly registered?: boolean;
    public readonly grades?: Grade[];
    public readonly countries?: string[];
    public readonly mine?: boolean;

    public constructor(builder: EventTeamsRequestBuilder) {
      super(builder);
      if (builder.#eventId === undefined) {
        throw new Error('Missing required property EventTeamsRequest.eventId');
      }
      this.eventId = builder.#eventId;
      this.numbers = builder.#numbers;
      this.registered = builder.#registered;
      this.grades = builder.#grades;
      this.countries = builder.#countries;
      this.mine = builder.#mine;
    }

    public params(): EventTeamsParams {
      return {
        ...super.params(),
        number: this.numbers,
        registered: this.registered,
        grade: this.grades,
        country: this.countries,
        myTeams: this.mine,
      };
    }
  };
}

export class EventTeamsRequest extends EventTeamsRequestBuilder.EventTeamsRequest {}

interface EventTeamsParams extends PageableParams {
  number?: string[];
  registered?: boolean;
  grade?: Grade[];
  country?: string[];
  myTeams?: boolean;
}
