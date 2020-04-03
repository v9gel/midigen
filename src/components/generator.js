var MidiWriter = require("midi-writer-js");

var oldNoteNumber = -10;
function randomInteger(min, max, isRepeatedControl = false) {
  if (min === max) {
    return 0;
  } else {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    let value = Math.round(rand);

    if (isRepeatedControl) {
      if (value === oldNoteNumber) {
        return randomInteger(min, max, isRepeatedControl);
      } else {
        oldNoteNumber = value;
        return value;
      }
    } else {
      return value;
    }
  }
}

function randomBeat(beatConst) {
  let beatLength = 128;

  let curLength = 0;
  let beat = [];
  while (curLength < beatLength) {
    let be = beatConst[randomInteger(0, beatConst.length - 1)];
    if (curLength + be > beatLength) {
      be = beatLength - curLength;
    }
    beat.push(be);
    curLength = curLength + be;
  }
  return beat;
}

const notes = [
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
  "D5",
  "E5",
  "F5",
  "G5",
  "A5",
  "B5",
];

function generator({ noteCount, repeatControl, oneBeatFile, beatConst }) {
  oneBeatFile;
  let track = new MidiWriter.Track();
  let events = [];

  let beat = randomBeat(beatConst);
  beat.forEach((r) => {
    events.push(
      new MidiWriter.NoteEvent({
        pitch: [notes[randomInteger(0, noteCount - 1, repeatControl)]],
        duration: "T" + r * 4,
      })
    );
  });

  track.setTempo(30).addEvent(events, function (event, index) {
    event;
    index;
    return { sequential: true };
  });

  let write = new MidiWriter.Writer(track);
  return write.dataUri();
}

// console.log(randomBeat([1,2,3]));
export default generator;
// console.log(generator({noteCount:1, repeatControl:true, oneBeatFile:true, beatConst:[2,4,8]}));
