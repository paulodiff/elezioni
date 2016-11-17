# elezioni

### Client REST per i web service Elettorali
`elezioni` permette di interfacciare attraverso chiamate REST il web service del Ministero per le comunicazioni elettorali.

Ws - Client elezioni

#### Caratteristiche

 * Attraverso chiamate API/REST interfaccia le chiamate WEB service del ministero
 * Nasconde la complessità per generare tutta l'autenticazione WSS degli xml
 * Per la generazione degli XML usa dei template
 * Supports multiple target versions of Node

Installazione
-------------

##### E' richiesta un'installazione di Node.js >= 4.4.5
##### E' richiest l'installazione di Git >= 2.9.0 windows

Eseguire i seguenti comandi:

``` bash
$ git clone https://github.com/paulodiff/elezioni.git
$ cd elezioni
$ npm install
$ npm nodemon
$ patch-ws-js.bat (patch per la libreria ws.js)
$ nodemon 
```

### ATTENZIONE PATCH DA APPLICARE
##### E' necessario eseguire la seguente patch alla libreria ws.js
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


E' necessario impostare le seguenti proprietà



Riferimnenti
------------

NodeJS 
WS-JS https://github.com/yaronn/ws.js



E' necessario impostare le seguenti proprietà

| **Command**                       | **Description**
|:----------------------------------|:------------------------------------------
| `-j n`, `--jobs n`                | Run make in parallel
| `--target=v6.2.1`                 | Node version to build for (default=process.version)
| `--silly`, `--loglevel=silly`     | Log all progress to console
| `--verbose`, `--loglevel=verbose` | Log most progress to console
| `--silent`, `--loglevel=silent`   | Don't log anything to console
| `debug`, `--debug`                | Make Debug build (default=Release)
| `--release`, `--no-debug`         | Make Release build
| `-C $dir`, `--directory=$dir`     | Run command in different directory
| `--make=$make`                    | Override make command (e.g. gmake)
| `--thin=yes`                      | Enable thin static libraries
| `--arch=$arch`                    | Set target architecture (e.g. ia32)
| `--tarball=$path`                 | Get headers from a local tarball
| `--devdir=$path`                  | SDK download directory (default=~/.node-gyp)
| `--ensure`                        | Don't reinstall headers if already present
| `--dist-url=$url`                 | Download header tarball from custom URL
| `--proxy=$url`                    | Set HTTP proxy for downloading header tarball
| `--cafile=$cafile`                | Override default CA chain (to download tarball)
| `--nodedir=$path`                 | Set the path to the node binary
| `--python=$path`                  | Set path to the python (2) binary
| `--msvs_version=$version`         | Set Visual Studio version (win)
| `--solution=$solution`            | Set Visual Studio Solution version (win)


Avvio
-----

```bash

$ nodemon

```




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
ionic-conference-app/
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