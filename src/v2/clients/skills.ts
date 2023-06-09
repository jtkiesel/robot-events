import type {ObjectBuilder} from '../../builders.js';
import {Client} from '../client.js';
import {
  PageableRequest,
  PageableRequestBuilder,
  type PageableParams,
} from '../pageable.js';
import type {Skill, SkillType} from './index.js';

export class SkillsClient extends Client {
  public findAllByEvent(
    request: (
      builder: EventSkillsRequestBuilder
    ) => ObjectBuilder<EventSkillsRequest>
  ) {
    const req = request(new EventSkillsRequestBuilder()).build();
    return this.getAll<Skill>(`/events/${req.eventId}/skills`, req.params());
  }

  public findAllByTeam(
    request: (
      builder: TeamSkillsRequestBuilder
    ) => ObjectBuilder<TeamSkillsRequest>
  ) {
    const req = request(new TeamSkillsRequestBuilder()).build();
    return this.getAll<Skill>(`/teams/${req.teamId}/skills`, req.params());
  }
}

export class EventSkillsRequestBuilder extends PageableRequestBuilder<
  EventSkillsRequest,
  EventSkillsRequestBuilder
> {
  #eventId?: number;
  #teamIds?: number[];
  #types?: SkillType[];

  public eventId(value: number) {
    this.#eventId = value;
    return this;
  }

  public teamIds(...value: number[]) {
    this.#teamIds = value;
    return this;
  }

  public types(...value: SkillType[]) {
    this.#types = value;
    return this;
  }

  public override build() {
    return new EventSkillsRequest(this);
  }

  public static EventSkillsRequest = class extends PageableRequest {
    public readonly eventId: number;
    public readonly teamIds?: number[];
    public readonly types?: SkillType[];

    public constructor(builder: EventSkillsRequestBuilder) {
      super(builder);
      if (builder.#eventId === undefined) {
        throw new Error('Missing required property EventSkillsRequest.eventId');
      }
      this.eventId = builder.#eventId;
      this.teamIds = builder.#teamIds;
      this.types = builder.#types;
    }

    public params(): EventSkillsParams {
      return {...super.params(), team: this.teamIds, type: this.types};
    }
  };
}

export class EventSkillsRequest extends EventSkillsRequestBuilder.EventSkillsRequest {}

interface EventSkillsParams extends PageableParams {
  team?: number[];
  type?: SkillType[];
}

export class TeamSkillsRequestBuilder extends PageableRequestBuilder<
  TeamSkillsRequest,
  TeamSkillsRequestBuilder
> {
  #teamId?: number;
  #eventIds?: number[];
  #types?: SkillType[];
  #seasonIds?: number[];

  public teamId(value: number) {
    this.#teamId = value;
    return this;
  }

  public eventIds(...value: number[]) {
    this.#eventIds = value;
    return this;
  }

  public types(...value: SkillType[]) {
    this.#types = value;
    return this;
  }

  public seasonIds(...value: number[]) {
    this.#seasonIds = value;
    return this;
  }

  public override build() {
    return new TeamSkillsRequest(this);
  }

  public static TeamSkillsRequest = class extends PageableRequest {
    public readonly teamId: number;
    public readonly eventIds?: number[];
    public readonly types?: SkillType[];
    public readonly seasonIds?: number[];

    public constructor(builder: TeamSkillsRequestBuilder) {
      super(builder);
      if (builder.#teamId === undefined) {
        throw new Error('Missing required property TeamSkillsRequest.teamId');
      }
      this.teamId = builder.#teamId;
      this.eventIds = builder.#eventIds;
      this.types = builder.#types;
      this.seasonIds = builder.#seasonIds;
    }

    public params(): TeamSkillsParams {
      return {
        ...super.params(),
        event: this.eventIds,
        type: this.types,
        season: this.seasonIds,
      };
    }
  };
}

export class TeamSkillsRequest extends TeamSkillsRequestBuilder.TeamSkillsRequest {}

interface TeamSkillsParams extends PageableParams {
  event?: number[];
  type?: SkillType[];
  season?: number[];
}
