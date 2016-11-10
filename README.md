# elezioni

### Client REST per i web service Elettorali
`elezioni` permette di interfacciare attraverso chiamate REST il web service del Ministero per le comunicazioni elettorali.

Ws - Client elezioni

#### Caratteristiche:

 * Attraverso chiamate API/REST interfaccia le chiamate WEB service del ministero
 * Nasconde la complessità per generare tutta l'autenticazione WSS degli xml
 * Per la generazione degli XML usa dei template
 * Supports multiple target versions of Node

Installazione:
--------------

##### E' richiesta un'installazione di Node.js >= 4.4.5

E' possibile avviare l'installazione  `npm`:

``` bash
$ git clone https://github.com/paulodiff/elezioni.git
$ cd elezioni
$ npm init
```

##### ___ATTENZIONE____
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


#### Configurazione:

La configurazione avviene



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

