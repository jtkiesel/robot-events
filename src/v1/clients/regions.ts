import type {Region} from './index.js';
import {Client} from '../client.js';

export class RegionsClient extends Client {
  public async findAll() {
    return await this.get<Region[]>('/regions');
  }

  public async findAllByCountry(countryId: number) {
    return await this.get<Region[]>(`/regions/${countryId}`);
  }
}
