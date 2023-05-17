import type {ObjectBuilder} from '../../builders.js';
import {Client} from '../client.js';
import {
  PageableRequest,
  PageableRequestBuilder,
  type PageableParams,
} from '../pageable.js';
import type {Ranking} from './index.js';

export class RankingsClient extends Client {
  public findAllByEventDivision(
    request: (
      builder: EventDivisionRankingsRequestBuilder
    ) => ObjectBuilder<EventDivisionRankingsRequest>
  ) {
    const req = request(new EventDivisionRankingsRequestBuilder()).build();
    return this.getAll<Ranking>(
      `/events/${req.eventId}/divisions/${req.divisionId}/rankings`,
      req.params()
    );
  }

  public findAllByTeam(
    request: (
      builder: TeamRankingsRequestBuilder
    ) => ObjectBuilder<TeamRankingsRequest>
  ) {
    const req = request(new TeamRankingsRequestBuilder()).build();
    return this.getAll<Ranking>(`/teams/${req.teamId}/rankings`, req.params());
  }

  public findAllFinalistsByEventDivision(
    request: (
      builder: EventDivisionRankingsRequestBuilder
    ) => ObjectBuilder<EventDivisionRankingsRequest>
  ) {
    const req = request(new EventDivisionRankingsRequestBuilder()).build();
    return this.getAll<Ranking>(
      `/events/${req.eventId}/divisions/${req.divisionId}/finalistRankings`,
      req.params()
    );
  }
}

export class EventDivisionRankingsRequestBuilder extends PageableRequestBuilder<
  EventDivisionRankingsRequest,
  EventDivisionRankingsRequestBuilder
> {
  #eventId?: number;
  #divisionId?: number;
  #teamIds?: number[];
  #ranks?: number[];

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

  public ranks(...value: number[]) {
    this.#ranks = value;
    return this;
  }

  public override build() {
    return new EventDivisionRankingsRequest(this);
  }

  public static EventDivisionRankingsRequest = class extends PageableRequest {
    public readonly eventId: number;
    public readonly divisionId: number;
    public readonly teamIds?: number[];
    public readonly ranks?: number[];

    public constructor(builder: EventDivisionRankingsRequestBuilder) {
      super(builder);
      if (builder.#eventId === undefined) {
        throw new Error(
          'Missing required property EventDivisionRankingsRequest.eventId'
        );
      }
      if (builder.#divisionId === undefined) {
        throw new Error(
          'Missing required property EventDivisionRankingsRequest.divisionId'
        );
      }
      this.eventId = builder.#eventId;
      this.divisionId = builder.#divisionId;
      this.teamIds = builder.#teamIds;
      this.ranks = builder.#ranks;
    }

    public params(): EventDivisionRankingsParams {
      return {...super.params(), team: this.teamIds, rank: this.ranks};
    }
  };
}

export class EventDivisionRankingsRequest extends EventDivisionRankingsRequestBuilder.EventDivisionRankingsRequest {}

interface EventDivisionRankingsParams extends PageableParams {
  team?: number[];
  rank?: number[];
}

export class TeamRankingsRequestBuilder extends PageableRequestBuilder<
  TeamRankingsRequest,
  TeamRankingsRequestBuilder
> {
  #teamId?: number;
  #eventIds?: number[];
  #ranks?: number[];
  #seasonIds?: number[];

  public teamId(value: number) {
    this.#teamId = value;
    return this;
  }

  public eventIds(...value: number[]) {
    this.#eventIds = value;
    return this;
  }

  public ranks(...value: number[]) {
    this.#ranks = value;
    return this;
  }

  public seasonIds(...value: number[]) {
    this.#seasonIds = value;
    return this;
  }

  public override build() {
    return new TeamRankingsRequest(this);
  }

  public static TeamRankingsRequest = class extends PageableRequest {
    public readonly teamId: number;
    public readonly eventIds?: number[];
    public readonly ranks?: number[];
    public readonly seasonIds?: number[];

    public constructor(builder: TeamRankingsRequestBuilder) {
      super(builder);
      if (builder.#teamId === undefined) {
        throw new Error('Missing required property TeamRankingsRequest.teamId');
      }
      this.teamId = builder.#teamId;
      this.eventIds = builder.#eventIds;
      this.ranks = builder.#ranks;
      this.seasonIds = builder.#seasonIds;
    }

    public params(): TeamRankingsParams {
      return {
        ...super.params(),
        event: this.eventIds,
        rank: this.ranks,
        season: this.seasonIds,
      };
    }
  };
}

export class TeamRankingsRequest extends TeamRankingsRequestBuilder.TeamRankingsRequest {}

interface TeamRankingsParams extends PageableParams {
  event?: number[];
  rank?: number[];
  season?: number[];
}
