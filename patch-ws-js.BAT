ECHO PATCH_WS_JS
copy .\patch-ws-js\security.js .\node_modules\ws.js\security.js
copy .\patch-ws-js\lib\handlers\client\http.js .\node_modules\ws.js\lib\handlers\client\http.js
copy .\patch-ws-js\lib\handlers\client\security\security.js  .\node_modules\ws.js\lib\handlers\client\security\security.js
mkdir log