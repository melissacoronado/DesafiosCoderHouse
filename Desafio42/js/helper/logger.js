"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerWarn = exports.loggerError = exports.logger = void 0;
const log4js_1 = require("log4js");
log4js_1.configure({
    appenders: {
        consolelog: { type: "console" },
        warnlog: { type: 'file', filename: 'warn.log' },
        errorLog: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: { appenders: ["consolelog"], level: "trace" },
        archivo: { appenders: ["warnlog"], level: "warn" },
        archivo2: { appenders: ["errorLog"], level: "error" },
        todos: { appenders: ["consolelog", "warnlog", "errorLog"], level: "error" }
    }
});
exports.logger = log4js_1.getLogger();
exports.loggerError = log4js_1.getLogger('archivo2');
exports.loggerWarn = log4js_1.getLogger('archivo');
