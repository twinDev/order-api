"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = (err, req, res, next) => {
    // tslint:disable-next-line: no-console
    console.log(err);
    next(err);
};
exports.clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something went wrong!' });
    }
    else {
        next(err);
    }
};
exports.errorHanlder = (err, req, res, next) => {
    res.status(500).send({ error: err.message });
};
