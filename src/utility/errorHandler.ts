import { NextFunction, Request, Response } from 'express'

export let logging = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        // tslint:disable-next-line: no-console
        console.log(err)
        next(err)
}

export let clientErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something went wrong!' })
    } else {
        next(err)
    }
}

export let errorHanlder = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    res.status(500).send({ error: err.message })
}
