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
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
class PassportConfiguration {
    constructor() {
        passport.use(new passport_jwt_1.Strategy({
            secretOrKey: 'top_secret',
            jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
        }, (token, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                return done(null, token.user);
            }
            catch (error) {
                done(error);
            }
        })));
    }
}
exports.PassportConfiguration = PassportConfiguration;
