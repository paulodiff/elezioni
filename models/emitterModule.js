/** 
 * REalizza un Bus per gli eventi fra moduli
 * 
*/

var util = require('util')
var eventEmitter = require('events').EventEmitter

function Event () {
    eventEmitter.call(this)
}

util.inherits(Event, eventEmitter)

Event.prototype.sendEvent = function(type, data) {
    // console.log('emitterModule:',type,data);
    console.log('emitterModule:',type, ' ... data ...' );
    this.emit(type, data)
}

var eventBus = new Event();
module.exports = {
 emitter : Event,
 eventBus : eventBus
};