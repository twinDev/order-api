"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js2xmlparser = require("js2xmlparser");
const applicationType_1 = require("../models/applicationType");
exports.formatOutPut = (res, data, statusCode, rootElement) => {
    return res.format({
        json: () => {
            res.type(applicationType_1.ApplicationType.JSON);
            res.status(statusCode).send(data);
        },
        xml: () => {
            res.type(applicationType_1.ApplicationType.XML);
            res.status(200).send(js2xmlparser.parse(rootElement, data));
        },
        default: () => {
            res.status(406).send();
        },
    });
};
