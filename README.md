# @robotevents/client

A Robot Events API client.

## Installing

**Node.js 16.0.0 or newer is required.**

```sh
npm install @robotevents/client
yarn add @robotevents/client
pnpm add @robotevents/client
```

## Example usage

Obtain a team from the Robot Events API:

```js
import {ProgramId, RobotEventsClient} from '@robotevents/client';

const robotEventsClient = new RobotEventsClient({
  token: process.env.ROBOT_EVENTS_TOKEN,
});

const teams = await robotEventsClient.teams
  .findAll(_ => _.programIds(ProgramId.VRC).numbers('24C'))
  .toArray();

if (teams.length) {
  console.log(teams[0]);
} else {
  console.log('Team not found');
}
```
