README

Ws - Client elezioni


**************** PATCH ********************

Libreria ws.js 
- modificato il timestamp da 5 a 180 per problemi fuso orario senza indagare oltre
- Modificato expires_timespan da 5 a 180 in due file security.js
- Modificato il proxy nella file node_modules\ws.js\lib\handlers\client\http.js

, body: ctx.request
, proxy: "http://......:8080/,
, headers: { "SOAPAction": ctx.action 


*******************************************






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

