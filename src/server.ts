import 'dotenv/config';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import App from './app';
import config from './ormconfig';
import validateEnv from './utils/validateEnv';
import UserController from "./applications/user/user.controller";
import TravelController from "./applications/travel/travel.controller";
import DayController from "./applications/schedule/day/day.controller";

validateEnv();

(async () => {
  try {
    const connection = await createConnection(config);
    console.log('CONNECTED TO DB')
    await connection.runMigrations();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App(
    [
      // new PostController(),
      new UserController(),
      // new TagController(),
      new TravelController(),
      new DayController(),
    ],
  );
  app.listen();
})();