const log4js = require('@log4js-node/log4js-api');
const logger1 = log4js.getLogger('my-library');

logger1.info("Library starting up");

var log4js_config1 = {
  appenders:{ startBroker:{type:'file',filename:'Mosca.log'}},
  categories:{default:{appenders:['startBroker'],level:'info'}}
};

var log4js_config2 = {
  appenders: {
    out: { type: 'console' },
    logfile: {  type: 'file', 
                filename: 'log/logfile.log', 
                category: 'file-logger',
                maxLogSize: 120480,
                backups: 10,
                category: 'file-logger' 
            }
  },
  categories: {
    default: { appenders: [ 'out', 'logfile' ], level: 'debug' }
  }
};

log4js.configure(log4js_config1);

/*


log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', 
      filename: 'log/logfile.log', 
      category: 'file-logger',
      maxLogSize: 120480,
      backups: 10,
      category: 'file-logger' 
    }
  ]
});

*/

var logger = log4js.getLogger();
// init logging
var logCon  = log4js.getLogger();
// var loggerDB = log4js.getLogger('mongodb');
var logFile = log4js.getLogger('file-logger');


exports.log2file = function(data) {
  return logFile.debug(data);
}

exports.log2console = function(data) {
  return logCon.debug(data);
}

exports.log2all = function(data) {
  return logCon.debug(data);
}




