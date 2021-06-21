import { configure, getLogger } from 'log4js';

configure({
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

  export const logger = getLogger();
  export const loggerError = getLogger('archivo2');
  export const loggerWarn = getLogger('archivo');