// Route for Elezioni

var express = require('express');
var router = express.Router();
// var request = require('request');
var os = require('os');
var fs = require('fs');
var path = require('path');
var util = require('util');
var soap = require('soap');
var request = require('request');
// var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
// var jwt = require('jwt-simple');
var ENV = require('../configENV.js'); // load configuration data
var ENV_ELEZIONI = require('../configELEZIONI.js'); // load user configuration data
// var mongocli = require('../models/mongocli');
var async = require('async');
// var Segnalazione  = require('../models/segnalazione.js'); // load configuration data
// var flow = require('../models/flow-node.js')('tmp'); // load configuration data
var utilityModule = require('../models/utilityModule.js');
var handlebars = require('handlebars');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var uuid = require('uuid');
// var SAMPLE_DATA = require ('../tmp/sampleData');
var emitterBus = require("../models/emitterModule.js");
var logConsole = require('../models/loggerModuleWinston.js');
logConsole.info('START Module Elezioni.js');

var ACCESS_CONTROLL_ALLOW_ORIGIN = false;
// var DW_PATH = (path.join(__dirname, './storage'));
// var DW_PATH = './storage';
// var DW_PATH = ENV.storagePath;
var _ = require('lodash');


module.exports = function () {

    var WS_IRIDE = "";
    var MODO_OPERATIVO = "TEST";
    var MY_SOCKET = {};
    

/*
    function emitMessage(req, msg) {
        logConsole.info('emitMessage:scocket',msg);
        var io = req.app.get('socketio');
        io.emit('news', { "msg": msg });
    }
*/
    
    // invia un documento ad ElasticSearch
    function sendElastic(data) {
        logConsole.info('send2Elastic');
        return new Promise(function (resolve, reject) {
            var my_uuid = uuid.v1();
            // "PUT http://10.10.128.79:9200/velox3/velocita/" & uuid & " -d @" & sFTPTempFile"
            // locals.push(sampleData[dataId]);
            url = ENV_ELEZIONI.elastic_url + my_uuid;
            logConsole.info('Elastic:url:'+ url);

            // console.log(data);

            var options = {
                // url : url,
                uri: url,
                method: 'PUT',
                proxy: ENV_ELEZIONI.proxy_url,
                json: true,
                body: data
            };

            request(options, function (error, response, body) {
                if (error) {
                    logConsole.error('ELASTIC:Errore invio richiesta ...');
                    logConsole.error(error);
                    // console.log(error);
                    reject(error);
                }
                if (!error && response.statusCode == 201) {
                    resolve(response);
                } else {
                    // console.log('Errore invio richiesta ...', response);
                    logConsole.error('ELASTIC:Errore invio richiesta ...');
                    logConsole.error(response);
                    reject(response);
                }
            });
        });
    }

    // esegue la chiamata Soap
    function sendSoap(operationId, endpoint, request, keyFile) {

        return new Promise(function (resolve, reject) {

            var ws = require('ws.js');
            var fs = require('fs');
            var sec = ws.Security;
            var X509BinarySecurityToken = ws.X509BinarySecurityToken;
            var FileKeyInfo = require('xml-crypto').FileKeyInfo;
            var x509 = new X509BinarySecurityToken({ "key": fs.readFileSync(keyFile).toString() });
            var signature = new ws.Signature(x509);
            signature.addReference("//*[local-name(.)='Body']");
            signature.addReference("//*[local-name(.)='Timestamp']");
            signature.addReference("//*[local-name(.)='BinarySecurityToken']");

            var sec = new ws.Security({}, [x509, signature]);
            var handlers = [sec, new ws.Http()];
            var ctx = {
                request: request,
                proxy: ENV_ELEZIONI.proxy_url_soap,
                url: endpoint,
                action: operationId,
                contentType: "text/xml"
            };
            
            logConsole.info("SENDSOAP: ctx ", ctx);

            ws.send(handlers, ctx, function (ctx) {
                logConsole.info("SENDSOAP: status :" + ctx.statusCode);

                if (ctx.statusCode != 200) {
                    logConsole.error("SENDSOAP: reject ");
                    logConsole.error(ctx);
                    reject(ctx);
                } else {
                    logConsole.info("SENDSOAP: resolve ");
                    resolve(ctx);
                }

                // console.log("messagse " + ctx.response);
                // console.log(ctx.request);
                // return ctx;
                
            });
        
        });
        
    }

    // Estrare una parte da un JSON
    function extractItem(obj, strItemId) {
        var ids = [];
        for (var prop in obj) {
            if (typeof obj[prop] == "object" && obj[prop]) {
                // console.log(prop, strItemId);
                if (prop == strItemId) {
                    // console.log('-->', obj[prop]);
                    // ids = obj[prop].map(function(elem){  return elem.id;  })
                    ids = obj[prop];
                }
                //console.log('concat', obj[prop]);
                ids = ids.concat(extractItem(obj[prop], strItemId));
            }
        }
        return ids;
    }

    /*

    // route socketUp
    router.get('/socketUp', function (req, res) {
        var io = req.app.get('socketio');
        logConsole.info('socketUp:');
        var data = {
                'dataDocumento': new Date(),
                'CodiceEsito': '9999',
                'operationId':'socketUp!',
                'DescrizioneEsito': '9999'
        };
        io.emit('news',  data );
        logConsole.info('io.socket ... emitted!');
        res.send('socketUp!');
    })

    */


    // route di test
    /*
    router.get('/test', function (req, res) {
        
        //var jsonFile = require('./file_test.json'); // the above in my local directory
        // var testJSON2 = SAMPLE_DATA.testJSON2;

        var io = req.app.get('socketio');
        io.emit('news', { msg: new Date() });
        console.log('io.socket ... emitted!');

        res.send('WS-ELEZIONI OK! ');
    })
    */

    // chiamate di test per verificare il funzionamento degli eventi live
    router.get('/testSse/:sseId', function (req, res) {
        console.log('testSse', req.params.sseId);
        emitterBus.eventBus.sendEvent('logMessage', { 
            sseId: req.params.sseId, 
            msg: {progressValue : 50, progressMax : 100} 
        });
        res.send('WS-ELEZIONI testSse OK! ');
    })

    router.get('/broadcastSse/:sseId', function (req, res) {
        console.log('broadcastSse', req.params.sseId);
        emitterBus.eventBus.sendEvent('broadcastMessage', { sseId: req.params.sseId, msg: 'broadcast ooook'});
        res.send('WS-ELEZIONI broadcastSse OK! ');
    })


    // esegue invio in produzione o test
    router.post('/batch/:envId', function (req, res) {

        // var io = req.app.get('socketio');
        logConsole.info('BATCH:');
        var envId = req.params.envId;
        if( (envId == "test") || (envId == "produzione") ) { 
        } else {
            logConsole.error('BATCH:envId NON TROVATA');
            res.status(500).send('envId: ' + envId + ' NON TROVATO (test/produzione)');
            return;
        }

        var batchId = envId[0] + utilityModule.pad(Math.floor((Math.random() * 10000) + 1),6);

        var sampleData = req.body;        
        var locals = [];

        logConsole.info('BATCH:lenght:' + sampleData.length);
        var lengthOfBatch = sampleData.length;

        async.forEachSeries(Object.keys(sampleData), function (dataId, callback) {
            
            logConsole.info('BATCH:dataId:' + dataId);
            logConsole.info('BATCH:operationId:'+ sampleData[dataId].action.operationId);
            logConsole.info('BATCH:actionId:' + sampleData[dataId].action.actionId);

            var operationId = sampleData[dataId].action.operationId;
            var actionId = sampleData[dataId].action.actionId;

            var url = ENV_ELEZIONI.ws_call_url + envId  + "/" + operationId + "/" + actionId;
            var xmlTagRisposta = 'Esito';
            if(typeof ENV_ELEZIONI[operationId] !== 'undefined') {
                xmlTagRisposta = ENV_ELEZIONI[operationId].xmlTagRisposta;
            } else {
                logConsole.info('batch:---:');
            }
             
            logConsole.info('BATCH:xmlTagRisposta:' + xmlTagRisposta);
            logConsole.info('BATCH:actionUrl:' + url);

            // locals.push(sampleData[dataId]);
            // console.log('Request .....');
            var options = {
                url: url,
                method: 'GET',
                qs: sampleData[dataId].data
            };

            if (ENV_ELEZIONI.proxy_url) options.proxy = ENV_ELEZIONI.proxy_url;

            logConsole.info('BATCH:request:options --- START ---');
            logConsole.info(options);
            logConsole.info('BATCH:request:options --- END  ----');

            setTimeout(

                function () {

                    request(options, function (error, response, body) {
                        logConsole.info('BATCH: check response:');
                        if (error) {
                            logConsole.error('BATCH: Errore invio richiesta ...');
                            logConsole.error(error);
                            var outJSON = {};

                            outJSON.batchId = batchId;
                            outJSON.envId = envId;
                            outJSON.progressValue = dataId;
                            outJSON.progressMax = lengthOfBatch;
                            outJSON.operationId = operationId;
                            outJSON.actionId = actionId;
                            outJSON.statusCode = "500";
                            outJSON.response = error;
                            outJSON.datiInput = sampleData[dataId].data;
                            outJSON.dataDocumento = new Date();
                            sendElastic(outJSON);
                            
                            // io.emit('news', outJSON);
                            emitterBus.eventBus.sendEvent('broadcastMessage', { sseId: 'Elezioni.js', statusCode:outJSON.statusCode,  msg: outJSON});
                            
                            callback(error);
                        }
                        if (!error && response.statusCode == 200) {

                            logConsole.info('BATCH: response OK : ' + actionId);
                            // console.log(response.body);

                            if (actionId == "sendXML") {
                                var info = JSON.parse(response.body);
                                // console.log(info);
                                parser.parseString(info.response, function (err, result) {
                                    // console.dir(result);
                                    var outJSON = {};
                                    var Esito = extractItem(result, "Esito");
                                    var SFault = extractItem(result, "S:Fault");
                                    var XMLRisposta = extractItem(result, xmlTagRisposta);

                                    outJSON.batchId = batchId;
                                    outJSON.envId = envId;
                                    outJSON.progressValue = dataId;
                                    outJSON.progressMax = lengthOfBatch;
                                    outJSON.operationId = operationId;
                                    outJSON.actionId = actionId;
                                    outJSON.url = info.url;
                                    outJSON.action = info.action;
                                    outJSON.statusCode = info.statusCode;
                                    outJSON.response = info.response;
                                    outJSON.xmlResponse = XMLRisposta;

                                    logConsole.info(Esito);
                                    // console.log(SFault);

                                    if(Esito.length > 0) {
                                        outJSON.CodiceEsito = Esito[0].CodiceEsito;
                                        outJSON.DescrizioneEsito = Esito[0].DescrizioneEsito;
                                        outJSON.DescrizioneLungaEsito = Esito[0].DescrizioneLungaEsito;
                                        outJSON.MessageToken = Esito[0].MessageToken;
                                    } else {
                                        outJSON.CodiceEsito = SFault[0].faultcode;
                                        outJSON.DescrizioneEsito = SFault[0].faultstring;
                                    }

                                    outJSON.dataDocumento = new Date();
                                    outJSON.datiInput = sampleData[dataId].data;
                                    locals.push(outJSON);
                                    sendElastic(outJSON);
                                    // io.emit('news', outJSON);
                                    emitterBus.eventBus.sendEvent('broadcastMessage', { sseId: 'Elezioni.js', statusCode:outJSON.statusCode,  msg: outJSON});
                                    callback();
                                });
                            } else {
                                var outJSON = {};
                                outJSON.batchId = batchId;
                                outJSON.envId = envId;
                                outJSON.progressValue = dataId;
                                outJSON.progressMax = lengthOfBatch;
                                outJSON.operationId = operationId;
                                outJSON.actionId = actionId;
                                outJSON.url = url;
                                outJSON.action = "showXML";
                                outJSON.statusCode = "200";
                                outJSON.response = response.body;
                                outJSON.CodiceEsito = "1000";
                                outJSON.DescrizioneEsito = "showXML Eseguito con successo";
                                outJSON.dataDocumento = new Date();
                                locals.push(outJSON);
                                sendElastic(outJSON);
                                emitterBus.eventBus.sendEvent('broadcastMessage', { sseId: 'Elezioni.js', statusCode:outJSON.statusCode,  msg: outJSON});
                                // io.emit('news', outJSON);
                                callback();
                            }
                        } else {
                            logConsole.error('BATCH: Errore generico');
                            var outJSON = {};
                            outJSON.batchId = batchId;
                            outJSON.envId = envId;
                            outJSON.progressValue = dataId;
                            outJSON.progressMax = lengthOfBatch;
                            outJSON.operationId = operationId;
                            outJSON.actionId = actionId;
                            outJSON.statusCode = "500";
                            outJSON.url = url;
                            outJSON.response = response.body;
                            outJSON.dataDocumento = new Date();
                            outJSON.datiInput = sampleData[dataId].data;
                            locals.push(outJSON);
                            // io.emit('news', outJSON);
                            emitterBus.eventBus.sendEvent('broadcastMessage', { sseId: 'Elezioni.js', statusCode:outJSON.statusCode,  msg: outJSON});
                            callback();
                        }
                    })
                }, 2000);

            //var action = trafficLightActions[color];
            //Play around with the color and action
        }, function (err) {
            //When done
            if (err) {
                logConsole.error('BATCH:FINAL Errore generico');
                logConsole.error(err);
                res.status(500).send(err);
            } else {
                logConsole.info('BATCH:FINAL Success! send locals');
                res.status(200).send(locals);
            }
            var finalMsg = {
                batchId: batchId,
                envId: envId,
                dataDocumento: new Date(),
                progressValue: lengthOfBatch,
                progressMax: lengthOfBatch,
                operationId: 'BATCH operazioni terminate',
                CodiceEsito: '###'
            }
            // io.emit('news', finalMsg);
            emitterBus.eventBus.sendEvent('broadcastMessage', 
            { sseId: 'Elezioni.js', statusCode:1000,  msg: finalMsg});
        });

        // var jsonFile = require('./file_test.json'); // the above in my local directory
        // console.log(req.params);
        // res.send(req.params);
    })


    router.get('/getConfig', function (req, res) {
        //var jsonFile = require('./file_test.json'); // the above in my local directory
        res.send(ENV_ELEZIONI);
    })




    // route che esegue la singola operazione soap distinguendo per ambiente
    router.get('/wscall/:envId/:operationId/:actionId', function (req, res) {

        logConsole.info('WSCALL:START');

        var xml2js = require('xml2js');
        var parser = new xml2js.Parser();

        var envId = req.params.envId;
        var operationId = req.params.operationId;
        var actionId = req.params.actionId;
        var endpoint = '';

        if (envId == "test") { 
            // var endpoint = ENV_ELEZIONI[operationId].endpoint_test;
            var keyFile = ENV_ELEZIONI.keyFile_test;
        } else if  (envId == "produzione") { 
            // var endpoint = ENV_ELEZIONI[operationId].endpoint_produzione;
            var keyFile = ENV_ELEZIONI.keyFile_produzione;
        } else {
            logConsole.error('WSCALL:envId NON TROVATA');
            res.status(500).send('envId: ' + envId + ' NON TROVATO (test/produzione)');
            return;
        }
                
        logConsole.info('WSCALL:envId      :'+ envId);
        logConsole.info('WSCALL:operationId:'+ operationId);
        logConsole.info('WSCALL:actionId   :'+ actionId);
        logConsole.info('WSCALL:keyFile    :'+ keyFile);

        // recupera la configurazione
        if (ENV_ELEZIONI[operationId]) { 
            if (envId == "test")        endpoint = ENV_ELEZIONI[operationId].endpoint_test;
            if (envId == "produzione")  endpoint = ENV_ELEZIONI[operationId].endpoint_produzione;
        } else {
            logConsole.error('WSCALL:operationId NON TROVATA');
            res.status(500).send('operationId: ' + operationId + ' (Url:/produzione/:operationId/:actionId) NON TROVATA in configurazione');
            return;
        }

        logConsole.info('WSCALL:endpoint:'+ endpoint);

        var xmlTagRisposta = ENV_ELEZIONI[operationId].xmlTagRisposta;
        logConsole.info('WSCALL:xmlTagRisposta:'+ xmlTagRisposta);

        // load template
        var templateFileName = ENV_ELEZIONI[operationId].templateFileName;
        logConsole.info('WSCALL:template:'+ templateFileName);

        var fileContents = '';

        try {
            fileContents = fs.readFileSync(templateFileName).toString();
        } catch (err) {
            logConsole.error('WSCALL:templateFileName: ' + templateFileName + ' NON TROVATA in configurazione');
            res.status(500).send('WSCALL:templateFileName: ' + templateFileName + ' NON TROVATA in configurazione');
            return;
        }

        // var data = dataSAMPLE; // dati di esempio
        var data = req.query;

        var template = handlebars.compile(fileContents);
        var xmlBuilded = template(data);

        if (actionId == 'showXML') {
            res.status(200).send(xmlBuilded);
            return;
        }

        if (actionId == 'sendXML') {
            logConsole.info('WSCALL:sendSoap');
            sendSoap(operationId, endpoint, xmlBuilded, keyFile).then(function (result) {
                if (result.statusCode == 200) {
                    logConsole.info('WSCALL:sendXML OK:');
                    logConsole.info('WSCALL:sendXML statusCode:' + result.statusCode);
                    // console.log(result.response);
                    res.status(200).send(result);
                } else {
                    logConsole.error('WSCALL:ERROR1:');
                    logConsole.error(error);
                    res.status(500).send('WSCALL:ERRORE GRAVE - VEDERE LOG.');
                }
            }).catch(function (err) {
                    logConsole.error('WSCALL:ERROR2:');
                    logConsole.error(err);
                    res.status(500).send(err);
            });

        } else {
            logConsole.error('actionId: ' + actionId + ' NON TROVATA  (showXML|sendXML)');
            res.status(500).send('actionId: ' + actionId + ' NON TROVATA  (showXML|sendXML)');
            return;
        }
    });

    return router;
}

/*

<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
<xsl:template match="/">
{
  CodiceEsito: "<xsl:value-of select="//*[local-name() = 'CodiceEsito']"/>",
  DescrizioneEsito: "<xsl:value-of select="//*[local-name() = 'DescrizioneEsito']"/>",
  MessageToken: "<xsl:value-of select="//*[local-name() = 'MessageToken']"/>"
}
</xsl:template>
</xsl:stylesheet>

*/