import type {ObjectBuilder} from '../../builders.js';
import {Client} from '../client.js';
import {
  PageableRequest,
  PageableRequestBuilder,
  type PageableParams,
} from '../pageable.js';
import type {Match} from './index.js';

export class MatchesClient extends Client {
  public findAllByEventDivision(
    request: (
      builder: EventDivisionMatchesRequestBuilder
    ) => ObjectBuilder<EventDivisionMatchesRequest>
  ) {
    const req = request(new EventDivisionMatchesRequestBuilder()).build();
    return this.getAll<Match>(
      `/events/${req.eventId}/divisions/${req.divisionId}/matches`,
      req.params()
    );
  }

  public findAllByTeam(
    request: (
      builder: TeamMatchesRequestBuilder
    ) => ObjectBuilder<TeamMatchesRequest>
  ) {
    const req = request(new TeamMatchesRequestBuilder()).build();
    return this.getAll<Match>(`/teams/${req.teamId}/matches`, req.params());
  }
}

export class EventDivisionMatchesRequestBuilder extends PageableRequestBuilder<
  EventDivisionMatchesRequest,
  EventDivisionMatchesRequestBuilder
> {
  #eventId?: number;
  #divisionId?: number;
  #teamIds?: number[];
  #rounds?: number[];
  #instances?: number[];
  #numbers?: number[];

  public eventId(value: number) {
    this.#eventId = value;
    return this;
  }

  public divisionId(value: number) {
    this.#divisionId = value;
    return this;
  }

  public teamIds(...value: number[]) {
    this.#teamIds = value;
    return this;
  }

  public rounds(...value: number[]) {
    this.#rounds = value;
    return this;
  }

  public instances(...value: number[]) {
    this.#instances = value;
    return this;
  }

  public numbers(...value: number[]) {
    this.#numbers = value;
    return this;
  }

  public override build() {
    return new EventDivisionMatchesRequest(this);
  }

  public static EventDivisionMatchesRequest = class extends PageableRequest {
    public readonly eventId: number;
    public readonly divisionId: number;
    public readonly teamIds?: number[];
    public readonly rounds?: number[];
    public readonly instances?: number[];
    public readonly numbers?: number[];

    public constructor(builder: EventDivisionMatchesRequestBuilder) {
      super(builder);
      if (builder.#eventId === undefined) {
        throw new Error(
          'Missing required property EventDivisionMatchesRequest.eventId'
        );
      }
      if (builder.#divisionId === undefined) {
        throw new Error(
          'Missing required property EventDivisionMatchesRequest.divisionId'
        );
      }
      this.eventId = builder.#eventId;
      this.divisionId = builder.#divisionId;
      this.teamIds = builder.#teamIds;
      this.rounds = builder.#rounds;
      this.instances = builder.#instances;
      this.numbers = builder.#numbers;
    }

    public params(): EventDivisionMatchesParams {
      return {
        ...super.params(),
        team: this.teamIds,
        round: this.rounds,
        instance: this.instances,
        matchnum: this.numbers,
      };
    }
  };
}

export class EventDivisionMatchesRequest extends EventDivisionMatchesRequestBuilder.EventDivisionMatchesRequest {}

interface EventDivisionMatchesParams extends PageableParams {
  team?: number[];
  round?: number[];
  instance?: number[];
  matchnum?: number[];
}

export class TeamMatchesRequestBuilder extends PageableRequestBuilder<
  TeamMatchesRequest,
  TeamMatchesRequestBuilder
> {
  #teamId?: number;
  #eventIds?: number[];
  #seasonIds?: number[];
  #rounds?: number[];
  #instances?: number[];
  #numbers?: number[];

  public teamId(value: number) {
    this.#teamId = value;
    return this;
  }

  public eventIds(...value: number[]) {
    this.#eventIds = value;
    return this;
  }

  public seasonIds(...value: number[]) {
    this.#seasonIds = value;
    return this;
  }

  public rounds(...value: number[]) {
    this.#rounds = value;
    return this;
  }

  public instances(...value: number[]) {
    this.#instances = value;
    return this;
  }

  public numbers(...value: number[]) {
    this.#numbers = value;
    return this;
  }

  public override build() {
    return new TeamMatchesRequest(this);
  }

  public static TeamMatchesRequest = class extends PageableRequest {
    public readonly teamId: number;
    public readonly eventIds?: number[];
    public readonly seasonIds?: number[];
    public readonly rounds?: number[];
    public readonly instances?: number[];
    public readonly numbers?: number[];

    public constructor(builder: TeamMatchesRequestBuilder) {
      super(builder);
      if (builder.#teamId === undefined) {
        throw new Error('Missing required property TeamMatchesRequest.teamId');
      }
      this.teamId = builder.#teamId;
      this.eventIds = builder.#eventIds;
      this.seasonIds = builder.#seasonIds;
      this.rounds = builder.#rounds;
      this.instances = builder.#instances;
      this.numbers = builder.#numbers;
    }

    public params(): TeamMatchesParams {
      return {
        ...super.params(),
        event: this.eventIds,
        season: this.seasonIds,
        round: this.rounds,
        instance: this.instances,
        matchnum: this.numbers,
      };
    }
  };
}

export class TeamMatchesRequest extends TeamMatchesRequestBuilder.TeamMatchesRequest {}

interface TeamMatchesParams extends PageableParams {
  event?: number[];
  season?: number[];
  round?: number[];
  instance?: number[];
  matchnum?: number[];
}
