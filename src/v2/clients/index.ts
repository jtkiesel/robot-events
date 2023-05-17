export * from './awards.js';
export * from './events.js';
export * from './matches.js';
export * from './programs.js';
export * from './rankings.js';
export * from './seasons.js';
export * from './skills.js';
export * from './teams.js';

export interface Alliance {
  color: AllianceColor;
  score: number;
  teams: AllianceTeam[];
}

export enum AllianceColor {
  Red = 'red',
  Blue = 'blue',
}

export interface AllianceTeam {
  team: IdInfo<null>;
  sitting: boolean;
}

export interface Award {
  id: number;
  event: IdInfo<string>;
  order: number;
  title: string;
  qualifications: string[];
  designation: AwardDesignation | null;
  classification: AwardClassification | null;
  teamWinners: TeamAwardWinner[];
  individualWinners: string[];
}

export enum AwardClassification {
  Champion = 'champion',
  Finalist = 'finalist',
  Semifinalist = 'semifinalist',
  Quarterfinalist = 'quarterfinalist',
}

export enum AwardDesignation {
  Tournament = 'tournament',
  Division = 'division',
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Division {
  id: number;
  name: string;
  order: number;
}

export interface Event {
  id: number;
  sku: string;
  name: string;
  start: Date;
  end: Date;
  season: IdInfo<null>;
  program: IdInfo<string>;
  location: EventLocation;
  locations: {[start: string]: EventLocation};
  divisions: Division[];
  level: EventLevel;
  ongoing: boolean;
  awards_finalized: boolean;
  event_type: EventType | null;
}

export enum EventLevel {
  World = 'World',
  National = 'National',
  Regional = 'Regional',
  State = 'State',
  Signature = 'Signature',
  Other = 'Other',
}

export interface EventLocation {
  venue: string | null;
  address_1: string;
  address_2: string | null;
  city: string;
  region: string | null;
  postcode: string;
  country: string;
  coordinates: Coordinates;
}

export enum EventType {
  Tournament = 'tournament',
  League = 'league',
  Workshop = 'workshop',
  Virtual = 'virtual',
}

export enum Grade {
  College = 'College',
  HighSchool = 'High School',
  MiddleSchool = 'Middle School',
  ElementarySchool = 'Elementary School',
}

export interface IdInfo<C extends string | null> {
  id: number;
  name: string;
  code: C;
}

export interface Match {
  id: number;
  event: IdInfo<string>;
  division: IdInfo<null>;
  round: number;
  instance: number;
  matchnum: number;
  scheduled: Date | null;
  started: Date | null;
  field: string | null;
  scored: boolean;
  name: string;
  alliances: Alliance[];
}

export interface Paginated<T> {
  meta: PageMeta;
  data: T[];
}

export interface PageMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  from: number;
  to: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  prev_page_url: string;
  next_page_url: string;
  path: string;
}

export interface Program {
  id: number;
  abbr: string;
  name: string;
}

export enum ProgramId {
  VRC = 1,
  VEXU = 4,
  Workshop = 37,
  VIQC = 41,
  NRL = 43,
  ADC = 44,
  TVRC = 46,
  TIQC = 47,
  VRAD = 51,
  BellAVR = 55,
  FAC = 56,
  VAIC = 57,
}

export interface Ranking {
  id: number;
  event: IdInfo<string>;
  division: IdInfo<null>;
  rank: number;
  team: IdInfo<null>;
  wins: number;
  losses: number;
  ties: number;
  wp: number;
  ap: number;
  sp: number;
  high_score: number | null;
  average_points: number | null;
  total_points: number | null;
}

export enum Round {
  Practice = 1,
  Qualification = 2,
  Quarterfinal = 3,
  Semifinal = 4,
  Final = 5,
  RoundOf16 = 6,
  RoundOf32 = 7,
  RoundOf64 = 8,
  RoundOf128 = 9,
  TopN = 15,
  RoundRobin = 16,
}

export interface Season {
  id: number;
  name: string;
  program: IdInfo<string>;
  start: Date;
  end: Date;
  years_start: number | null;
  years_end: number | null;
}

export interface Skill {
  id: number;
  event: IdInfo<string>;
  team: IdInfo<null>;
  type: SkillType;
  season: IdInfo<null>;
  division: IdInfo<null>;
  rank: number;
  score: number;
  attempts: number;
}

export enum SkillType {
  Driver = 'driver',
  Programming = 'programming',
}

export interface Team {
  id: number;
  number: string;
  team_name: string;
  robot_name: string | null;
  organization: string | null;
  location: TeamLocation;
  registered: boolean;
  program: IdInfo<string>;
  grade: Grade;
}

export interface TeamAwardWinner {
  division: IdInfo<null>;
  team: IdInfo<null>;
}

export interface TeamLocation {
  venue: null;
  address_1: '';
  address_2: null;
  city: string;
  region: string | null;
  postcode: string;
  country: string;
  coordinates: Coordinates;
}
