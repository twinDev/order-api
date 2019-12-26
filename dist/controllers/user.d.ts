import { NextFunction, Request, Response } from 'express';
export declare let getUser: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let addUser: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let updateUser: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let removeUser: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let login: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
