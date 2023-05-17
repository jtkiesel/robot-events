import axios from 'axios';
import axiosRateLimit, {type rateLimitOptions} from 'axios-rate-limit';
import {
  AwardsClient,
  EventsClient,
  MatchesClient,
  ProgramsClient,
  RankingsClient,
  SeasonsClient,
  SkillsClient,
  TeamsClient,
} from './clients/index.js';

export * from './clients/index.js';

export class RobotEventsClient {
  public readonly awards;
  public readonly events;
  public readonly matches;
  public readonly programs;
  public readonly rankings;
  public readonly seasons;
  public readonly skills;
  public readonly teams;

  public constructor(options: RobotEventsClientOptions = {}) {
    const token = options.token ?? process.env.ROBOT_EVENTS_TOKEN;
    if (token === undefined) {
      throw new Error(
        'Robot Events API token must be provided via client option "token" or environment variable ROBOT_EVENTS_TOKEN'
      );
    }
    const axiosInstance = axios.create({
      baseURL: options.url ?? 'https://robotevents.com/api/v2',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    (axiosRateLimit as unknown as typeof axiosRateLimit.default)(
      axiosInstance,
      options.rateLimit ?? {
        maxRequests: 100,
        perMilliseconds: 60_000,
      }
    );
    this.awards = new AwardsClient(axiosInstance);
    this.events = new EventsClient(axiosInstance);
    this.matches = new MatchesClient(axiosInstance);
    this.programs = new ProgramsClient(axiosInstance);
    this.rankings = new RankingsClient(axiosInstance);
    this.seasons = new SeasonsClient(axiosInstance);
    this.skills = new SkillsClient(axiosInstance);
    this.teams = new TeamsClient(axiosInstance);
  }
}

export interface RobotEventsClientOptions {
  url?: string;
  token?: string;
  rateLimit?: rateLimitOptions;
}
