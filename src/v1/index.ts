import axios from 'axios';
import {
  CountriesClient,
  EventsClient,
  ProgramsClient,
  RegionsClient,
  SkillsClient,
  TeamsClient,
} from './clients/index.js';

export * from './clients/index.js';
export * from './client.js';

export class RobotEventsV1Client {
  public readonly countries;
  public readonly events;
  public readonly programs;
  public readonly regions;
  public readonly skills;
  public readonly teams;

  public constructor(options: RobotEventsV1ClientOptions = {}) {
    const axiosInstance = axios.create({
      baseURL: options.url ?? 'https://robotevents.com/api',
    });
    this.countries = new CountriesClient(axiosInstance);
    this.events = new EventsClient(axiosInstance);
    this.programs = new ProgramsClient(axiosInstance);
    this.regions = new RegionsClient(axiosInstance);
    this.skills = new SkillsClient(axiosInstance);
    this.teams = new TeamsClient(axiosInstance);
  }
}

export interface RobotEventsV1ClientOptions {
  url?: string;
}
