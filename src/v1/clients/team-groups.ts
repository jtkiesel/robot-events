import type {TeamGroup} from './index.js';
import {Client} from '../client.js';
import type {ObjectBuilder} from '../../builders.js';

export class TeamGroupsClient extends Client {
  public async findAll(
    request?: (
      builder: TeamGroupsRequestBuilder
    ) => ObjectBuilder<TeamGroupsRequest>
  ) {
    return this.post<TeamGroup[]>(
      '/teams/latLngGrp',
      request?.(new TeamGroupsRequestBuilder()).build().data()
    );
  }
}

export class TeamGroupsRequestBuilder
  implements ObjectBuilder<TeamGroupsRequest>
{
  #programIds?: number[];
  #seasonId?: number;
  #country?: string;
  #region?: string;

  public programIds(...value: number[]) {
    this.#programIds = value;
    return this;
  }

  public seasonId(value: number) {
    this.#seasonId = value;
    return this;
  }

  public location(country: string, region?: string) {
    this.#country = country;
    this.#region = region;
    return this;
  }

  public build() {
    return new TeamGroupsRequest(this);
  }

  public static TeamGroupsRequest = class {
    public readonly programIds?: number[];
    public readonly seasonId?: number;
    public readonly country?: string;
    public readonly region?: string;

    public constructor(builder: TeamGroupsRequestBuilder) {
      this.programIds = builder.#programIds;
      this.seasonId = builder.#seasonId;
      this.country = builder.#country;
      this.region = builder.#region;
    }

    public data(): TeamGroupsData {
      return {
        programs: this.programIds,
        season_id: this.seasonId,
        country: this.country,
        region: this.region,
        when: this.seasonId !== undefined ? When.PAST : undefined,
      };
    }
  };
}

export class TeamGroupsRequest extends TeamGroupsRequestBuilder.TeamGroupsRequest {}

interface TeamGroupsData {
  programs?: number[];
  season_id?: number;
  country?: string;
  region?: string;
  when?: When;
}

enum When {
  FUTURE = 'future',
  PAST = 'past',
}
