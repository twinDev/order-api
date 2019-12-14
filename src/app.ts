import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as expressWinston from 'express-winston'
import * as mongoose from 'mongoose'
import mongoose1 = require('mongoose');
import * as winston from 'winston'
import { APIRoute } from './routes/api'
import { OrderRoute } from './routes/order'
import { UserRoute } from './routes/user'
import * as errorHandler from './utility/errorHandler'

class App {
  public app: express.Application
  public userRoutes: UserRoute = new UserRoute()
  public apiRoutes: APIRoute = new APIRoute()
  public orderRoutes: OrderRoute = new OrderRoute()
  public mongoUrl: string =
    'mongodb+srv://admin_dev3:twindev@cluster0-fxhv7.azure.mongodb.net/test?retryWrites=true&w=majority'

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.userRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.orderRoutes.routes(this.app)
    this.mongoSetup()
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
      })
    )
    this.app.use(errorHandler.logging)
    this.app.use(errorHandler.clientErrorHandler)
    this.app.use(errorHandler.errorHanlder)
  }

  private mongoSetup(): void {
    mongoose1.Promise = global.Promise
    mongoose1.connect(this.mongoUrl, { useUnifiedTopology: true, useCreateIndex: true })
  }
}

export default new App().app
