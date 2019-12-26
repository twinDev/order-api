import { NextFunction, Request, Response } from 'express';
export declare let logging: (err: Error, req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let clientErrorHandler: (err: Error, req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let errorHanlder: (err: Error, req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
