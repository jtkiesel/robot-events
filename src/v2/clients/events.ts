import type {ObjectBuilder} from '../../builders.js';
import {Client} from '../client.js';
import {
  PageableRequest,
  PageableRequestBuilder,
  type PageableParams,
} from '../pageable.js';
import type {Event, EventLevel, EventType} from './index.js';

export class EventsClient extends Client {
  public findAll(
    request?: (builder: EventsRequestBuilder) => ObjectBuilder<EventsRequest>
  ) {
    return this.getAll<Event>(
      '/events',
      request?.(new EventsRequestBuilder()).build().params()
    );
  }

  public findAllBySeason(
    request: (
      builder: SeasonEventsRequestBuilder
    ) => ObjectBuilder<SeasonEventsRequest>
  ) {
    const req = request(new SeasonEventsRequestBuilder()).build();
    return this.getAll<Event>(`/seasons/${req.seasonId}/events`, req.params());
  }

  public findAllByTeam(
    request: (
      builder: TeamEventsRequestBuilder
    ) => ObjectBuilder<TeamEventsRequest>
  ) {
    const req = request(new TeamEventsRequestBuilder()).build();
    return this.getAll<Event>(`/teams/${req.teamId}/events`, req.params());
  }

  public async findById(id: number) {
    return this.get<Event>(`/events/${id}`);
  }
}

export class EventsRequestBuilder extends PageableRequestBuilder<
  EventsRequest,
  EventsRequestBuilder
> {
  #ids?: number[];
  #skus?: string[];
  #teamIds?: number[];
  #seasonIds?: number[];
  #start?: Date;
  #end?: Date;
  #levels?: EventLevel[];
  #mine?: boolean;
  #types?: EventType[];

  public ids(...value: number[]) {
    this.#ids = value;
    return this;
  }

  public skus(...value: string[]) {
    this.#skus = value;
    return this;
  }

  public teamIds(...value: number[]) {
    this.#teamIds = value;
    return this;
  }

  public seasonIds(...value: number[]) {
    this.#seasonIds = value;
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

  public levels(...value: EventLevel[]) {
    this.#levels = value;
    return this;
  }

  public mine(value: boolean) {
    this.#mine = value;
    return this;
  }

  public types(...value: EventType[]) {
    this.#types = value;
    return this;
  }

  public override build() {
    return new EventsRequest(this);
  }

  public static EventsRequest = class extends PageableRequest {
    public readonly ids?: number[];
    public readonly skus?: string[];
    public readonly teamIds?: number[];
    public readonly seasonIds?: number[];
    public readonly start?: Date;
    public readonly end?: Date;
    public readonly levels?: EventLevel[];
    public readonly mine?: boolean;
    public readonly types?: EventType[];

    public constructor(builder: EventsRequestBuilder) {
      super(builder);
      this.ids = builder.#ids;
      this.skus = builder.#skus;
      this.teamIds = builder.#teamIds;
      this.seasonIds = builder.#seasonIds;
      this.start = builder.#start;
      this.end = builder.#end;
      this.levels = builder.#levels;
      this.mine = builder.#mine;
      this.types = builder.#types;
    }

    public params(): EventsParams {
      return {
        ...super.params(),
        id: this.ids,
        sku: this.skus,
        team: this.teamIds,
        season: this.seasonIds,
        start: this.start,
        end: this.end,
        level: this.levels,
        myEvents: this.mine,
        eventType: this.types,
      };
    }
  };
}

export class EventsRequest extends EventsRequestBuilder.EventsRequest {}

interface EventsParams extends PageableParams {
  id?: number[];
  sku?: string[];
  team?: number[];
  season?: number[];
  start?: Date;
  end?: Date;
  level?: EventLevel[];
  myEvents?: boolean;
  eventType?: EventType[];
}

export class SeasonEventsRequestBuilder extends PageableRequestBuilder<
  SeasonEventsRequest,
  SeasonEventsRequestBuilder
> {
  #seasonId?: number;
  #skus?: string[];
  #teamIds?: number[];
  #start?: Date;
  #end?: Date;
  #levels?: EventLevel[];

  public seasonId(value: number) {
    this.#seasonId = value;
    return this;
  }

  public skus(...value: string[]) {
    this.#skus = value;
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

  public levels(...value: EventLevel[]) {
    this.#levels = value;
    return this;
  }

  public override build() {
    return new SeasonEventsRequest(this);
  }

  public static SeasonEventsRequest = class extends PageableRequest {
    public readonly seasonId: number;
    public readonly skus?: string[];
    public readonly teamIds?: number[];
    public readonly start?: Date;
    public readonly end?: Date;
    public readonly levels?: EventLevel[];

    public constructor(builder: SeasonEventsRequestBuilder) {
      super(builder);
      if (builder.#seasonId === undefined) {
        throw new Error(
          'Missing required property SeasonEventsRequest.seasonId'
        );
      }
      this.seasonId = builder.#seasonId;
      this.skus = builder.#skus;
      this.teamIds = builder.#teamIds;
      this.start = builder.#start;
      this.end = builder.#end;
      this.levels = builder.#levels;
    }

    public params(): SeasonEventsParams {
      return {
        ...super.params(),
        sku: this.skus,
        team: this.teamIds,
        start: this.start,
        end: this.end,
        level: this.levels,
      };
    }
  };
}

export class SeasonEventsRequest extends SeasonEventsRequestBuilder.SeasonEventsRequest {}

interface SeasonEventsParams extends PageableParams {
  sku?: string[];
  team?: number[];
  start?: Date;
  end?: Date;
  level?: EventLevel[];
}

export class TeamEventsRequestBuilder extends PageableRequestBuilder<
  TeamEventsRequest,
  TeamEventsRequestBuilder
> {
  #teamId?: number;
  #skus?: string[];
  #seasonIds?: number[];
  #start?: Date;
  #end?: Date;
  #levels?: EventLevel[];

  public teamId(value: number) {
    this.#teamId = value;
    return this;
  }

  public skus(...value: string[]) {
    this.#skus = value;
    return this;
  }

  public seasonIds(...value: number[]) {
    this.#seasonIds = value;
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

  public levels(...value: EventLevel[]) {
    this.#levels = value;
    return this;
  }

  public override build() {
    return new TeamEventsRequest(this);
  }

  public static TeamEventsRequest = class extends PageableRequest {
    public readonly teamId: number;
    public readonly skus?: string[];
    public readonly seasonIds?: number[];
    public readonly start?: Date;
    public readonly end?: Date;
    public readonly levels?: EventLevel[];

    public constructor(builder: TeamEventsRequestBuilder) {
      super(builder);
      if (builder.#teamId === undefined) {
        throw new Error('Missing required property TeamEventsRequest.teamId');
      }
      this.teamId = builder.#teamId;
      this.skus = builder.#skus;
      this.seasonIds = builder.#seasonIds;
      this.start = builder.#start;
      this.end = builder.#end;
      this.levels = builder.#levels;
    }

    public params(): TeamEventsParams {
      return {
        ...super.params(),
        sku: this.skus,
        season: this.seasonIds,
        start: this.start,
        end: this.end,
        level: this.levels,
      };
    }
  };
}

export class TeamEventsRequest extends TeamEventsRequestBuilder.TeamEventsRequest {}

interface TeamEventsParams extends PageableParams {
  sku?: string[];
  season?: number[];
  start?: Date;
  end?: Date;
  level?: EventLevel[];
}
