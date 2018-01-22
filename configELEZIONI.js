
var ENV = require('./configENV.js');

// file di configurazione
module.exports = {

    id_elezione : 'POLITICHE_2018',
    keyFile_produzione : './tmp/produzione2.pem', // certificato ambiente di produzione
    keyFile_test : './tmp/test.pem',     // certificato ambiente di test
    log_filename: 'POLITICHE_2018.log', // nome del file di log inserito nella cartella ./log
    log_level : 'DEBUG', // ERROR
    // url MongoDB dove viene inviato un PUT con la risposta generata (per Monitoraggio) - opzionale
    elastic_url : 'http://10.10.128.79:9200/elezioni/politiche2018/',
    // eventuale proxy
    // proxy_url : 'http://proxy1.comune.rimini.it:8080',
    
    // ELENCO DI TUTTE LE AZIONI WEB SERVICE
    // Per ogni azioni è impostato un oggetto di questo tipo 
    //
    // nomeAzione : {
    //    templateFileName : '', // template file per la generazione xml presente nella cartella templateXML
    //    endpoint_produzione : '', // endpoint in produzione della azione in oggetto
    //    endpoint_test : '', // endpoint in test della azione in oggetto
    //    xmlTagRisposta : '' // tag XML che contiene la risposta (da documentazione Ministero) che viene inserito nella risposta
    //    
    // }
    //

    recuperaEventiElettorali: {
        templateFileName : './templateXML/recuperaEventiElettorali.xml', // template file per la generazione xml
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSBase/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSBase/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoEventiElettorali' // tag XML che contiene la risposta (da documentazione Ministero)
    },

    recuperaInfoAreaAcquisizione: {
        templateFileName : './templateXML/recuperaInfoAreaAcquisizione.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSBase/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSBase/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcquisizione'
    },

    recuperaInfoAreaAcquisizioneVotantiCamera: {
        templateFileName : './templateXML/recuperaInfoAreaAcquisizioneVotantiCamera.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcquisizioneVotanti'
    },
    
    recuperaInfoAreaAcquisizioneVotantiSenato: {
        templateFileName : './templateXML/recuperaInfoAreaAcquisizioneVotantiSenato.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcquisizioneVotanti'
    },

    recuperaSezioniCamera: {
        templateFileName : './templateXML/recuperaSezioniCamera.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcquisizioneSezioni'
    },

    recuperaSezioniSenato: {
        templateFileName : './templateXML/recuperaSezioniSenato.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcquisizioneSezioni'
    },

    recuperaInfoElettoriCamera: {
        templateFileName : './templateXML/recuperaInfoElettoriCamera.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoRecuperaElettori'
    },

    recuperaInfoElettoriSenato: {
        templateFileName : './templateXML/recuperaInfoElettoriSenato.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoRecuperaElettori'
    },

    recuperaVotantiCamera: {
        templateFileName : './templateXML/recuperaVotantiCamera.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcqVotantiRec'
    },
    
    recuperaVotantiSenato: {
        templateFileName : './templateXML/recuperaVotantiSenato.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcqVotantiRec'
    },

    recuperaInfoCandidatiListeCamera: {
        templateFileName : './templateXML/recuperaInfoCandidatiListeCamera.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoCandidatiListePolitiche'
    },

    recuperaInfoCandidatiListeSenato: {
        templateFileName : './templateXML/recuperaInfoCandidatiListeSenato.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoCandidatiListePolitiche'
    },

    recuperaScrutiniCamera: {
        templateFileName : './templateXML/recuperaScrutiniCamera.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'ScrutiniRec'
    },

    recuperaScrutiniSenato: {
        templateFileName : './templateXML/recuperaScrutiniSenato.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'ScrutiniRec'
    },

    /*
    recuperaInfoAreaAcquisizioneVotantiReferendum: {
        templateFileName : './templateXML/recuperaInfoAreaAcquisizioneVotantiReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcquisizioneVotanti'
    },
    */

    recuperaInfoQuesiti: {
        templateFileName : './templateXML/recuperaInfoQuesiti.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoQuesitiReferendum'
    },

    recuperaInfoElettoriReferendum: {
        templateFileName : './templateXML/recuperaInfoElettoriReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'ElencoElettori'
    },

    recuperaSezioniReferendum: {
        templateFileName : './templateXML/recuperaSezioniReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcquisizioneSezioni'
    },

    recuperaVotantiReferendum: {
        templateFileName : './templateXML/recuperaVotantiReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoAreaAcqVotantiRec'
    },

    recuperaScrutiniReferendum: {
        templateFileName : './templateXML/recuperaScrutiniReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumScrutini/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumScrutini/ServiziElettoraliPort',
        xmlTagRisposta : 'Scrutini'
    },

    inviaSezioniReferendum: {
        templateFileName : './templateXML/inviaSezioniReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumSezioni/ServiziElettoraliPort',
        xmlTagRisposta : 'Esito'
    },

    inviaElettoriReferendum: {
        templateFileName : './templateXML/inviaElettoriReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumElettori/ServiziElettoraliPort',
        xmlTagRisposta : 'Esito'
    },

    inviaVotantiReferendum: {
        templateFileName : './templateXML/inviaVotantiReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumVotanti/ServiziElettoraliPort',
        xmlTagRisposta : 'Esito'
    },
    
    inviaScrutiniReferendum: {
        templateFileName : './templateXML/inviaScrutiniReferendum.xml',
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSReferendumScrutini/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSReferendumScrutini/ServiziElettoraliPort',
        xmlTagRisposta : 'Esito'
    },

    // NON MODIFICARE I SEGUENTI
    ws_call_url : 'http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/wscall/',
    action_url_produzione : 'http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/produzione/',
    action_url_test : 'http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/test/',
    rest_url_produzione : 'http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/batch/produzione',
    rest_url_test : 'http://' + ENV.hostname + ':' + ENV.server_port +  '/elezioni/batch/test'

};
