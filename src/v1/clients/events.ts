import type {Event} from './index.js';
import {Client} from '../client.js';
import type {ObjectBuilder} from '../../builders.js';

export class EventsClient extends Client {
  public async findAll(
    request: (builder: EventsRequestBuilder) => ObjectBuilder<EventsRequest>
  ) {
    return await this.post<Event[]>(
      '/events',
      request(new EventsRequestBuilder()).build().data()
    );
  }
}

export class EventsRequestBuilder implements ObjectBuilder<EventsRequest> {
  #programIds?: number[];
  #seasonId?: number;
  #countryId?: number;
  #region?: string;

  public programIds(...value: number[]) {
    this.#programIds = value;
    return this;
  }

  public seasonId(value: number) {
    this.#seasonId = value;
    return this;
  }

  public location(countryId: number, region?: string) {
    this.#countryId = countryId;
    this.#region = region;
    return this;
  }

  public build() {
    return new EventsRequest(this);
  }

  public static EventsRequest = class EventsRequest {
    public readonly programIds: number[];
    public readonly seasonId?: number;
    public readonly countryId?: number;
    public readonly region?: string;

    public constructor(builder: EventsRequestBuilder) {
      if (!builder.#programIds?.length) {
        throw new Error('Missing required property EventsRequest.programIds');
      }
      this.programIds = builder.#programIds;
      this.seasonId = builder.#seasonId;
      this.countryId = builder.#countryId;
      this.region = builder.#region;
    }

    public data(): EventsData {
      return {
        programs: this.programIds,
        season_id: this.seasonId,
        country: this.countryId,
        region: this.region,
        when: this.seasonId !== undefined ? When.PAST : undefined,
      };
    }
  };
}

export class EventsRequest extends EventsRequestBuilder.EventsRequest {}

interface EventsData {
  programs: number[];
  season_id?: number;
  country?: number;
  region?: string;
  when?: When;
}

enum When {
  FUTURE = 'future',
  PAST = 'past',
}
