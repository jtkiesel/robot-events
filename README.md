# robot-events

A Robot Events API client.

## Installing

**Node.js 14.0.0 or newer is required.**

```sh
npm install robot-events
yarn add robot-events
pnpm add robot-events
```

## Example usage

Obtain a team from the Robot Events API:

```js
import {RobotEventsClient} from 'robot-events';

const robotEventsClient = new RobotEventsClient({
  token: process.env.ROBOT_EVENTS_TOKEN,
});

(async () => {
  const team = await robotEventsClient.teams
    .findAll(t => t.programIds(1, 4).numbers('24C'))
    .next();

  console.log(team);
})();
```
