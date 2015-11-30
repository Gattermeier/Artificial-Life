(()=>{
  class Animated {
    constructor(world) {
      this.world = world;
      let outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument;
      let node = outer.appendChild(doc.createElement("div"));
      node.style.cssText = "position: relative; width: intrinsic; width: fit-content;";
      this.pre = node.appendChild(doc.createElement("pre"));
      this.pre.appendChild(doc.createTextNode(world.toString()));
      this.button = node.appendChild(doc.createElement("div"));
      this.button.style.cssText = "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
      "background: #4ab; cursor: pointer; border-radius: 18px; font-size: 70%; width: 3.5em; text-align: center;";
      this.button.innerHTML = "stop";
      let self = this;
      this.button.addEventListener("click", ()=> { self.clicked(); });
      this.disabled = false;
      if (active) active.disable();
      active = this;
      this.interval = setInterval( ()=> { self.tick(); }, 50);
    }
    clicked() {
      if (this.disabled) return;
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        this.button.innerHTML = "start";
      } else {
        let self = this;
        this.interval = setInterval( ()=> { self.tick(); }, 50);
        this.button.innerHTML = "stop";
      }
    }

    tick() {
      this.world.turn();
      this.pre.removeChild(this.pre.firstChild);
      this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.world.toString()));
    }

    disable() {
      this.disabled = true;
      clearInterval(this.interval);
      this.button.innerHTML = "Disabled";
      this.button.style.color = "red";
    }
  }

  window.animateWorld = (world) => new Animated(world);
})();
