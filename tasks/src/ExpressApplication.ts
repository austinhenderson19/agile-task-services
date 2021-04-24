import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

export class ExpressApplication {
  public constructor() {
    this.app = express();
    this.setMiddleware();
  }

  private app: Application;

  private setMiddleware(): void {
    this.app.set('port', process.env.PORT || 4000);
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('dev'));
  }

  public startApp(): void {
    this.app.listen(this.app.get('port'), () => console.log(`Task Service listening on port ${this.app.get('port')}`));
  }
}
