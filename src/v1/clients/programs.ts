import type {Program} from './index.js';
import {Client} from '../client.js';

export class ProgramsClient extends Client {
  public async findAll() {
    return await this.get<Program[]>('/programs');
  }
}
