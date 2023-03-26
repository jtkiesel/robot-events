import type {Award} from '.';
import {Client} from '../client';
import type {Cursor} from '../cursor';
import {
  PageableParams,
  PageableRequest,
  PageableRequestBuilder,
} from '../pageable';
import type {ObjectBuilder} from '../builders';

export class Awards extends Client {
  public findAllByEvent(
    request: (
      builder: EventAwardsRequestBuilder
    ) => ObjectBuilder<EventAwardsRequest>
  ): Cursor<Award> {
    const req = request(new EventAwardsRequestBuilder()).build();
    return this.getAll(`/events/${req.eventId}/awards`, req.params());
  }

  public findAllByTeam(
    request: (
      builder: TeamAwardsRequestBuilder
    ) => ObjectBuilder<TeamAwardsRequest>
  ): Cursor<Award> {
    const req = request(new TeamAwardsRequestBuilder()).build();
    return this.getAll(`/teams/${req.teamId}/awards`, req.params());
  }
}

export class EventAwardsRequestBuilder extends PageableRequestBuilder<EventAwardsRequestBuilder> {
  #eventId?: number;
  #teamIds?: number[];
  #individuals?: string[];

  public eventId(value: number) {
    this.#eventId = value;
    return this;
  }

  public teamIds(...value: number[]) {
    this.#teamIds = value;
    return this;
  }

  public individuals(...value: string[]) {
    this.#individuals = value;
    return this;
  }

  public build() {
    return new EventAwardsRequest(this);
  }

  public static EventAwardsRequest = class extends PageableRequest {
    public readonly eventId: number;
    public readonly teamIds?: number[];
    public readonly individuals?: string[];

    public constructor(builder: EventAwardsRequestBuilder) {
      super(builder);
      if (builder.#eventId === undefined) {
        throw new Error('Missing required property EventAwardsRequest.eventId');
      }
      this.eventId = builder.#eventId;
      this.teamIds = builder.#teamIds;
      this.individuals = builder.#individuals;
    }

    public params(): EventAwardsParams {
      return {...super.params(), team: this.teamIds, winner: this.individuals};
    }
  };
}

export class EventAwardsRequest extends EventAwardsRequestBuilder.EventAwardsRequest {}

interface EventAwardsParams extends PageableParams {
  team?: number[];
  winner?: string[];
}

export class TeamAwardsRequestBuilder extends PageableRequestBuilder<TeamAwardsRequestBuilder> {
  #teamId?: number;
  #eventIds?: number[];
  #seasonIds?: number[];

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

  public build() {
    return new TeamAwardsRequest(this);
  }

  public static TeamAwardsRequest = class extends PageableRequest {
    public readonly teamId: number;
    public readonly eventIds?: number[];
    public readonly seasonIds?: number[];

    public constructor(builder: TeamAwardsRequestBuilder) {
      super(builder);
      if (builder.#teamId === undefined) {
        throw new Error('Missing required property TeamAwardsRequest.teamId');
      }
      this.teamId = builder.#teamId;
      this.eventIds = builder.#eventIds;
      this.seasonIds = builder.#seasonIds;
    }

    public params(): TeamAwardsParams {
      return {...super.params(), event: this.eventIds, season: this.seasonIds};
    }
  };
}

export class TeamAwardsRequest extends TeamAwardsRequestBuilder.TeamAwardsRequest {}

interface TeamAwardsParams extends PageableParams {
  event?: number[];
  season?: number[];
}
