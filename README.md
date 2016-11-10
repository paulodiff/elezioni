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

E' possibile avviare l'installazione  `npm`:

``` bash
$ git clone https://github.com/paulodiff/elezioni.git
$ cd elezioni
$ npm init
```

### ATTENZIONE PATCH DA APPLICARE
##### E' necessario eseguire la seguente patch alla libreria ws.js

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
- configELEZIONI.js

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

#### Uso:

Avvio

```bash
$ node index.js
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

