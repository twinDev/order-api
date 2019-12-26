import { NextFunction, Request, Response } from 'express';
export declare let getOrder: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let getAllOrders: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let addOrder: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let removeOrder: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare let getInventory: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
