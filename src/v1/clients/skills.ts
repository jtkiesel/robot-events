import axios from 'axios';
import type {Grade, Skill} from './index.js';
import {Client} from '../client.js';
import type {ObjectBuilder} from '../../builders.js';

export class SkillsClient extends Client {
  public async findAllBySeason(
    request: (
      builder: SeasonSkillsRequestBuilder
    ) => ObjectBuilder<SeasonSkillsRequest>
  ) {
    const req = request(new SeasonSkillsRequestBuilder()).build();
    try {
      return await this.get<Skill[]>(
        `/seasons/${req.seasonId}/skills`,
        req.params()
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  }
}

export class SeasonSkillsRequestBuilder
  implements ObjectBuilder<SeasonSkillsRequest>
{
  #seasonId?: number;
  #postseason?: number;
  #grade?: Grade;

  public seasonId(value: number) {
    this.#seasonId = value;
    return this;
  }

  public postseason(value: number) {
    this.#postseason = value;
    return this;
  }

  public grade(value: Grade) {
    this.#grade = value;
    return this;
  }

  public build() {
    return new SeasonSkillsRequest(this);
  }

  public static SeasonSkillsRequest = class {
    public readonly seasonId: number;
    public readonly postseason?: number;
    public readonly grade?: Grade;

    public constructor(builder: SeasonSkillsRequestBuilder) {
      if (builder.#seasonId === undefined) {
        throw new Error(
          'Missing required property SeasonSkillsRequest.seasonId'
        );
      }
      this.seasonId = builder.#seasonId;
      this.postseason = builder.#postseason;
      this.grade = builder.#grade;
    }

    public params(): SeasonSkillsParams {
      return {
        post_season: this.postseason,
        grade_level: this.grade,
      };
    }
  };
}

export class SeasonSkillsRequest extends SeasonSkillsRequestBuilder.SeasonSkillsRequest {}

interface SeasonSkillsParams {
  post_season?: number;
  grade_level?: Grade;
}
