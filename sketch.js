const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 800;
const keys = [];
const scale = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
const keycodes = [81, 87, 69, 82, 84, 89];
var synth;

class Key {
  constructor(note) {
    keys.push(this);
    this.note = note;
    this.button = createButton(note.charAt(0));
    this.button.position(100 * keys.length, 100);
    this.button.mousePressed(() => play(this.note));
  }
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  background(0);
  fill(255);
  Tone.start();
  synthSetup();
  textSize(32);
  text("Use the keys QWERTY to play", 170, 50);
  text("the notes CDEGAC", 225, 85);
  for(note of scale) {
    new Key(note);
  }
}

function keyPressed() {
  let degree = keycodes.findIndex(e => e == keyCode);
  if(degree > -1) {
    keys[degree].button.elt.focus();
    play(scale[degree]);
  }
}

function synthSetup() {
  synth = new Tone.Oscillator().toDestination();
  let lfo = new Tone.LFO('16n', -80, 0).start();
  let envelope = new Tone.AmplitudeEnvelope({
    "attack": .01, 
  }).toDestination();
  lfo.connect(synth.volume);
  synth.connect(envelope);
}

function play(note) {
  synth.stop();
  synth.frequency.value = note;
  synth.start().stop("+2n");
}