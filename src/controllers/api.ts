import { NextFunction, Request, Response } from 'express'
import { formatOutPut } from '../utility/orderApiUtility'

export let getApi = (req: Request, res: Response, next: NextFunction) => {
  return formatOutPut(res, { title: 'Order API' }, 200)
}
