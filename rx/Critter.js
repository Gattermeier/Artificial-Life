"use strict";
var Rx = require('rx');
import { turnEmitter } from './Creator'
import Life from './Life';

class Critter extends Life {
  constructor() {
    super()
    this.time = new Rx.Observable.fromEvent(turnEmitter, 'turn');
    this.time.subscribe(() => {
      console.log('time passed')
    })
  }
}

module.exports = Critter
