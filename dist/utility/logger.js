"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, prettyPrint, printf } = winston_1.format;
class OrderAPILogger {
}
exports.OrderAPILogger = OrderAPILogger;
OrderAPILogger.myformat = printf((info) => {
    return `[${info.timestamp}] [${info.level}] => ${info.message}`;
});
OrderAPILogger.logger = winston_1.createLogger({
    level: 'info',
    format: combine(label({ label: 'order-api errors' }), timestamp(), OrderAPILogger.myformat),
    transports: [
        new winston_1.transports.File({ filename: 'combined.log' }),
        new winston_1.transports.Console(),
    ],
});
