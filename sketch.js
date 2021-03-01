const SCREEN_WIDTH = 1280;
const SCREEN_HEIGHT = 800;
const keys = [];
const scale = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];

class Key {
  constructor(note) {
    keys.push(this);
    this.note = note;
    this.button = createButton(note);
    this.button.position(100 * keys.length, 100);
    this.button.mousePressed(() => play(this.note));
  }
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  background(0);
  fill(255);
  Tone.start();
  for(note of scale) {
    new Key(note);
  }
}

function draw() {

}


function play(note) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, "8n");
}