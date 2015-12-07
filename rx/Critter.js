"use strict";
var Rx = require('rx');
import { turnEmitter, critterEmitter } from './Creator'
import Life from './Life';

class Critter extends Life {
  constructor(props) {
    super(props) // includes 'age'
    this.id = Math.random()

    this.time = new Rx.Observable.fromEvent(turnEmitter, 'turn');
    this.time.subscribe(() => {
      // time is passing
      critterEmitter.emit('life', this);

    })

    this.tell = new Rx.Observable.fromEvent(turnEmitter, 'tell');
    this.tell.subscribe((id) => {
      if (this.id === id) {
        console.log('critter', this.id, 'age: ',this.age, 'self: ', this);
      }
    })
  }
}

module.exports = Critter
