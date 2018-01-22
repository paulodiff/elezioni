# elezioni

Ruggero Ruggeri - Comune di Rimini

### Client REST per i web service Elettorali
`elezioni` permette di interfacciare attraverso chiamate REST il web service del Ministero per le comunicazioni elettorali.

#### Caratteristiche

 * Attraverso chiamate API/REST interfaccia le chiamate Soap per le comunicazioni con il Ministero
 * Nasconde la complessità per generare tutta l'autenticazione WSS degli xml
 * Ha un log completo e permette chiamate batch
 * Per la generazione degli XML usa dei template per verificare la generazione corretta degli XML

#### Installazione


##### E' richiesta un'installazione di Node.js >= 4.4.5
##### E' richiesta l'installazione di Git >= 2.9.0 windows

Eseguire i seguenti comandi:

``` bash
$ git clone https://github.com/paulodiff/elezioni.git
$ cd elezioni
$ npm install
$ npm install nodemon
$ patch-ws-js.bat (patch per la libreria ws.js)
$ nodemon 
```

### ATTENZIONE PATCH DA APPLICARE
##### E' necessario eseguire la seguente patch alla libreria ws.js in quanto al momento (11/2016) non supporta la chiamata attraverso proxy e modifiche al timeout
##### In ambiente Windows è sufficiente avviare `patch-ws-js.bat` altrimenti eseguire manualmente i le azioni seguenti

Modificare i seguenti files della libreria ws.js (node_modules\ws.js)


Modificare il valore `expires_timespan` portandolo da 5 a 180 nei due file seguenti per risolvere i problemi di timestamp troppo brevi:

- node_modules\ws.js\lib\handlers\client\security\security.js
- node_modules\ws.js\security.js


Modificare il file seguente aggiungendo la riga indicata per permettere le chiamate attraverso un proxy:

- node_modules\ws.js\lib\handlers\client\http.js


``` javascript
HttpClientHandler.prototype.send = function(ctx, callback) {
  request.post({ url: ctx.url
               , body: ctx.request
	           , proxy: ctx.proxy //<== RIGA DA INSERIRE
               , headers: { "SOAPAction": ctx.action
                          , "Content-Type": ctx.contentType
                          , "MIME-Version": "1.0"
                          }
  

```

Configurazione
--------------

La configurazione avviene attraverso i seguenti due files:

- configENV.js

```javascript
module.exports = {
    hostname : '10.10.6.63', // indicare ip o nomehost dove viene eseguito il server 
    server_port : 9989       // indicare la porta di ascolto
};
```
- configELEZIONI.js (vedere il file di esempio)

E' necessario impostare le seguenti proprietà:

| **Command**                       | **Description**
|:----------------------------------|:------------------------------------------
| keyFile_produzione                | Percorso completo al certificato di accesso per la produzione (.PEM)
| keyFile_test                      | Percorso completo al certificato di accesso per il test (.PEM)
| log_filename                      | Nome del file di log nella cartella ./log
| log_level                         | DEBUG o ERROR
| keyFile_elastic_url               | Url MongoDB dove viene inviato con una PUT tutta la risposta del Ministero (log evoluto)
| proxy_url                         | Se l'uscita ad internet deve essere effettuata tramite proxy

inoltre devono essere definiti una serie di blocchi di configurazione per le chiamate Soap, così strutturati:

```javascript
    // ELENCO DI TUTTE LE AZIONI WEB SERVICE
    // Per ogni azione è impostato un oggetto di questo tipo 
    //
    // nomeAzione : {
    //    templateFileName : '', // template file per la generazione xml presente nella cartella templateXML
    //    endpoint_produzione : '', // endpoint in produzione della azione in oggetto
    //    endpoint_test : '', // endpoint in test della azione in oggetto
    //    xmlTagRisposta : '' // tag XML che contiene la risposta (da documentazione Ministero) che viene inserito nella risposta
    //    
    // }
    //

    Esempio:

    recuperaEventiElettorali: {
        templateFileName : './templateXML/recuperaEventiElettorali.xml', // template file per la generazione xml
        endpoint_produzione : 'https://elettoralews.interno.it/ServiziElettoraliWSBase/ServiziElettoraliPort',
        endpoint_test : 'https://elettoralews.preprod.interno.it/ServiziElettoraliWSBase/ServiziElettoraliPort',
        xmlTagRisposta : 'InfoEventiElettorali' // tag XML che contiene la risposta (da documentazione Ministero)
    },
```

#### Generazione dei template XML

- I template XML sono generati per essere utilizzati con la libreria handlebars.js (http://handlebarsjs.com/).
- E' sufficiente analizzare i template nella cartella `./templateXML` per capire la modalità di generazione.
- Sono stati utilizzati usando SoapUI aprendo i file wsdl forniti dal Ministero.  


Uso
---

```bash
$ nodemon
```

Viene avviato il server pronto per eseguire la chiamata.
Se si apre la pagina http://server:port si ha un log in tempo reale delle operazioni nella versione Angular Log

## Chiamata REST (consiglio Postman - plugin di Google Chrome)

- la chiamata è del tipo

- ApiEndpoint

 - - http://server:port/elezioni/batch/produzione (chiamata in produzione)
 - - http://server:port/elezioni/batch/test (chiamata in test)

- E' necessario impostare l'URL del servizio a "http://server:port/elezioni/batch/produzione"

- Il metodo deve essere POST

- Questo esempio invia due chiamate che sono effettuate in sequenza con un ritardo di 2 secondi, la risposta è cumulativa
e il parametro passato deve essere un array di strutture di questo tipo:



```javascript
[
            {
                "action": {
                    "operationId": "inviaScrutiniReferendum", // in configELEZIONI.js
                    "actionId": "showXML" // showXML: ritorna l'xml generato oppure sendXML (invio vero e proprio)
                },
                "data": {
                    "UserID": "[BASE64_USERID]",
                    "Password": "[BASE64_PASSWORD]",
                    // e tutti gli altri campi richiesti dal template

                }
            },
            {
                "action": {
                    "operationId": "inviaScrutiniReferendum", // in configELEZIONI.js
                    "actionId": "showXML" // showXML: ritorna l'xml generato oppure sendXML (invio vero e proprio)
                },
                "data": {
                    "UserID": "[BASE64_USERID]",
                    "Password": "[BASE64_PASSWORD]",
                    // e tutti gli altri campi richiesti dal template

                }
            }

            // ecc. per altre chiamate


]
```

- Ecco un esmpio di chiamata REST tramite CURL

```
curl -X POST -H "Content-Type: application/json" -d '[
            {
                "action": {
                    "operationId": "inviaScrutiniReferendum",
                    "actionId": "showXML"
                },
                "data": {
                    "UserID": "[BASE64_USERID]",
                    "Password": "[BASE64_PASSWORD]",
                    "CodiceComune": "140",
                    "CodiceProvincia": "101",
                    "TipoElezione": "7",
                    "DataElezione": "3016-12-04",
                    "LivelloAcquisizione" : "S",
                    "CodiceSezione" : "1",
                    "NumeroProgressivoArea" : "71010140000001",
                    "NumeroScheda" : "1",
                    "DataOraInizioComunicazione" : "3016-12-04T12:00:00",
                    "NumeroTotale" : "100",
                    "FlagInserimentoDefinitivo" : "true",
                    "NumeroVotantiMaschi": "90",
                    "NumeroVotantiFemmine": "90",
                    "NumeroVotantiTotale": "180",
                    "FlagRettifica": "true",
                    "NumeroSezioniPervenute": "1",
                    "NumeroSchedeBianche": "1",
                    "NumeroSchedeNulle" : "1",
                    "NumeroSchedeContestate" : "2",
                    "NumeroVotiSi": "88",
                    "NumeroVotiNo": "88",
                    "TotaleNumeroVoti": "176"
                }
            }
]' "http://server:port/elezioni/batch/produzione"
```


Riferimenti
-----------

WS-JS https://github.com/yaronn/ws.js

***
***

# FINE DOCUMENTO
## FINE DOCUMENTO

# This is an H1
## This is an H2
###### This is an H6

This is also an H1
==================

This is also an H2
------------------


```
This is a code block
```


```javascript
var oldUnload = window.onbeforeunload;
window.onbeforeunload = function() {
    saveCoverage();
    if (oldUnload) {
        return oldUnload.apply(this, arguments);
    }
};
```




*Italic characters* 
_Italic characters_
**bold characters**
__bold characters__
~~strikethrough text~~




* Item 1
* Item 2
* Item 3
  * Item 3a
  * Item 3b
  * Item 3c


## File Structure of App

```
ionic-conference-sapp/
├-- .github/                            * GitHub files
│   ├── CONTRIBUTING.md                 * Documentation on contributing to this repo
│   └── ISSUE_TEMPLATE.md               * Template used to populate issues in this repo
|
|-- resources/
|
|-- src/
|    |-- app/
|    |    ├── app.component.ts
|    |    └── app.module.ts
|    |    └── app.template.html
|    |    └── main.dev.ts
|    |    └── main.prod.ts
|    |
|    |-- assests/
|    |    ├── data/
|    |    |    └── data.json
|    |    |
|    |    ├── fonts/
|    |    |     ├── ionicons.eot
|    |    |     └── ionicons.svg
|    |    |     └── ionicons.ttf
|    |    |     └── ionicons.woff
|    |    |     └── ionicons.woff2
|    |    |
|    |    ├── img/
|    |
|    |-- pages/                          * Contains all of our pages
│    │    ├── about/                     * About tab page
│    │    │    ├── about.html            * AboutPage template
│    │    │    └── about.ts              * AboutPage code
│    │    │    └── about.scss            * AboutPage stylesheet
│    │    │
│    │    ├── account/                   * Account page
│    │    │    ├── account.html          * AccountPage template
│    │    │    └── account.ts            * AccountPage code
│    │    │    └── account.scss          * AccountPage stylesheet
│    │    │
│    │    │── login/                     * Login page
│    │    │    ├── login.html            * LoginPage template
│    │    │    └── login.ts              * LoginPage code
│    │    │    └── login.scss            * LoginPage stylesheet
│    │    │
│    │    │── map/                       * Map tab page
│    │    │    ├── map.html              * MapPage template
│    │    │    └── map.ts                * MapPage code
│    │    │    └── map.scss              * MapPage stylesheet
│    │    │
│    │    │── schedule/                  * Schedule tab page
│    │    │    ├── schedule.html         * SchedulePage template
│    │    │    └── schedule.ts           * SchedulePage code
│    │    │    └── schedule.scss         * SchedulePage stylesheet
│    │    │
│    │    │── schedule-filter/            * Schedule Filter page
│    │    │    ├── schedule-filter.html   * ScheduleFilterPage template
│    │    │    └── schedule-filter.ts     * ScheduleFilterPage code
│    │    │    └── schedule-filter.scss   * ScheduleFilterPage stylesheet
│    │    │
│    │    │── session-detail/            * Session Detail page
│    │    │    ├── session-detail.html   * SessionDetailPage template
│    │    │    └── session-detail.ts     * SessionDetailPage code
│    │    │
│    │    │── signup/                    * Signup page
│    │    │    ├── signup.html           * SignupPage template
│    │    │    └── signup.ts             * SignupPage code
│    │    │
│    │    │── speaker-detail/            * Speaker Detail page
│    │    │    ├── speaker-detail.html   * SpeakerDetailPage template
│    │    │    └── speaker-detail.ts     * SpeakerDetailPage code
│    │    │    └── speaker-detail.scss   * SpeakerDetailPage stylesheet
│    │    │
│    │    │── speaker-list/              * Speakers tab page
│    │    │    ├── speaker-list.html     * SpeakerListPage template
│    │    │    └── speaker-list.ts       * SpeakerListPage code
│    │    │    └── speaker-list.scss     * SpeakerListPage stylesheet
│    │    │
│    │    │── tabs/                      * Tabs page
│    │    │    ├── tabs.html             * TabsPage template
│    │    │    └── tabs.ts               * TabsPage code
│    │    │
│    │    └── tutorial/                  * Tutorial Intro page
│    │         ├── tutorial.html         * TutorialPage template
│    │         └── tutorial.ts           * TutorialPage code
│    │         └── tutorial.scss         * TutorialPage stylesheet
|    |
│    ├── providers/                      * Contains all Injectables
│    │     ├── conference-data.ts        * ConferenceData code
│    │     └── user-data.ts              * UserData code
│    ├── theme/                          * App theme files
|    |     ├── variables.scss            * App Shared Sass Variables
|    |
|    |-- index.html
|
|-- www/
|    ├── assets/
|    |    ├── data/
|    |    |    └── data.json
|    |    |
|    |    ├── fonts/
|    |    |     ├── ionicons.eot
|    |    |     └── ionicons.svg
|    |    |     └── ionicons.ttf
|    |    |     └── ionicons.woff
|    |    |     └── ionicons.woff2
|    |    |
|    |    ├── img/
|    |
|    └── build/
|    └── index.html
|
├── .editorconfig                       * Defines coding styles between editors
├── .gitignore                          * Example git ignore file
├── LICENSE                             * Apache License
├── README.md                           * This file
├── config.xml                          * Cordova configuration file
├── ionic.config.json                   * Ionic configuration file
├── package.json                        * Defines our JavaScript dependencies
├── tsconfig.json                       * Defines the root files and the compiler options
├── tslint.json                         * Defines the rules for the TypeScript linter
```