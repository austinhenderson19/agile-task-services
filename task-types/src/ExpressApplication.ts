import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { TaskController } from './Controllers/TaskController';
import DatabaseConnection from './Database/DatabaseConfiguration';

export class ExpressApplication {
  public constructor() {
    this.app = express();
    this.setMiddleware();
    this.connectToDatabase();
  }

  private app: Application;

  private setMiddleware(): void {
    this.app.set('port', process.env.PORT || 4001);
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());

    this.app.use('/', new TaskController().createRouter());
  }

  public startApp(): void {
    this.app.listen(this.app.get('port'), () => console.log(`Task Service listening on port ${this.app.get('port')}`));
  }

  private connectToDatabase(): void {
    DatabaseConnection();
  }
}
asdfasdfa;
