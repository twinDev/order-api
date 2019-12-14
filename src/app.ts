import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as expressWinston from 'express-winston'
import * as mongoose from 'mongoose'
import * as winston from 'winston'
import { APIRoute } from '../src/routes/api'
import { OrderRoute } from '../src/routes/order'
import { UserRoute } from '../src/routes/user'
import * as errorHandler from '../src/utility/errorHandler'

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
    try {
      mongoose.connect(this.mongoUrl, { useUnifiedTopology: true })
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new App().app
