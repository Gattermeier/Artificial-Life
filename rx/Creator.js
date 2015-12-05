// 'God' ^^ Not really ..
// create a new individual, with genome and energy from parent


var elementFromChar = function(legend, ch, genome, energy) {
  if (ch === " " || legend[ch] === undefined) {
    return null;
  }
  var element = new legend[ch](genome, energy);
  element.originChar = ch;
  return element;
}


var EventEmitter = require('events').EventEmitter;
var turnEmitter = new EventEmitter();

export { turnEmitter }
