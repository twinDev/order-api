"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const expressWinston = require("express-winston");
const mongoose = require("mongoose");
const winston = require("winston");
const api_1 = require("./routes/api");
const order_1 = require("./routes/order");
const user_1 = require("./routes/user");
const errorHandler = require("./utility/errorHandler");
class App {
    constructor() {
        this.userRoutes = new user_1.UserRoute();
        this.apiRoutes = new api_1.APIRoute();
        this.orderRoutes = new order_1.OrderRoute();
        this.mongoUrl = 'mongodb+srv://admin_dev3:twindev@cluster0-fxhv7.azure.mongodb.net/test?retryWrites=true&w=majority';
        this.app = express();
        this.app.use(bodyParser.json());
        this.userRoutes.routes(this.app);
        this.apiRoutes.routes(this.app);
        this.orderRoutes.routes(this.app);
        this.mongoSetup();
        this.app.use(expressWinston.errorLogger({
            transports: [new winston.transports.Console()],
        }));
        this.app.use(errorHandler.logging);
        this.app.use(errorHandler.clientErrorHandler);
        this.app.use(errorHandler.errorHanlder);
    }
    mongoSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose.connect(this.mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
                .then((response) => {
                // tslint:disable-next-line: no-console
                console.log('Connected' + response);
            })
                .catch((error) => {
                // tslint:disable-next-line: no-console
                console.log(error);
            });
        });
    }
}
exports.default = new App().app;
