import type {Country, CountryOption} from './index.js';
import {Client} from '../client.js';

export class CountriesClient extends Client {
  public async findAll() {
    return await this.get<Country[]>('/countries');
  }

  public async findOptions() {
    return await this.get<
      [
        {label: 'Commonly Selected'; options: CountryOption[]},
        {label: 'Alphabetical'; options: CountryOption[]}
      ]
    >('/countries', {common: true});
  }
}
