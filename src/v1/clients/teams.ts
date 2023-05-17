import type {Team} from './index.js';
import {Client} from '../client.js';
import type {ObjectBuilder} from '../../builders.js';

export class TeamsClient extends Client {
  public async findAllByTeamGroup(
    request: (
      builder: TeamGroupTeamsRequestBuilder
    ) => ObjectBuilder<TeamGroupTeamsRequest>
  ) {
    return this.post<Team[]>(
      '/teams/getTeamsForLatLng',
      request(new TeamGroupTeamsRequestBuilder()).build().data()
    );
  }
}

export class TeamGroupTeamsRequestBuilder
  implements ObjectBuilder<TeamGroupTeamsRequest>
{
  #latitude?: number;
  #longitude?: number;
  #programIds?: number[];
  #seasonId?: number;

  public latitude(value: number) {
    this.#latitude = value;
    return this;
  }

  public longitude(value: number) {
    this.#longitude = value;
    return this;
  }

  public programIds(...value: number[]) {
    this.#programIds = value;
    return this;
  }

  public seasonId(value: number) {
    this.#seasonId = value;
    return this;
  }

  public build() {
    return new TeamGroupTeamsRequest(this);
  }

  public static TeamGroupTeamsRequest = class {
    public readonly latitude: number;
    public readonly longitude: number;
    public readonly programIds?: number[];
    public readonly seasonId?: number;

    public constructor(builder: TeamGroupTeamsRequestBuilder) {
      if (builder.#latitude === undefined) {
        throw new Error(
          'Missing required property TeamGroupTeamsRequest.latitude'
        );
      }
      if (builder.#longitude === undefined) {
        throw new Error(
          'Missing required property TeamGroupTeamsRequest.longitude'
        );
      }
      this.latitude = builder.#latitude;
      this.longitude = builder.#longitude;
      this.programIds = builder.#programIds;
      this.seasonId = builder.#seasonId;
    }

    public data(): TeamGroupTeamsData {
      return {
        lat: this.latitude,
        lng: this.longitude,
        programs: this.programIds,
        season_id: this.seasonId,
        when: this.seasonId !== undefined ? When.PAST : undefined,
      };
    }
  };
}

export class TeamGroupTeamsRequest extends TeamGroupTeamsRequestBuilder.TeamGroupTeamsRequest {}

interface TeamGroupTeamsData {
  lat: number;
  lng: number;
  programs?: number[];
  season_id?: number;
  when?: When;
}

enum When {
  FUTURE = 'future',
  PAST = 'past',
}
