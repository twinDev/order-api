import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, prettyPrint, printf } = format

export class OrderAPILogger {
    public static myformat = printf((info) => {
        return `[${info.timestamp}] [${info.level}] => ${info.message}`
    })

    public static logger = createLogger({
        level: 'info',
        format: combine(
            label({ label: 'order-api errors' }),
            timestamp(),
            OrderAPILogger.myformat
        ),
        transports: [
            new transports.File({ filename: 'combined.log'}),
            new transports.Console(),
        ],
    })
}