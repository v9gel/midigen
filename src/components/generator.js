const MidiWriter = require("midi-writer-js");

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

function randomBeat(beatConst, { noteCount, repeatControl }) {
  let beatLength = 128;

  let curLength = 0;
  let beat = [];
  while (curLength < beatLength) {
    let be = beatConst[randomInteger(0, beatConst.length - 1)];
    if (curLength + be > beatLength) {
      be = beatLength - curLength;
    }
    beat.push({
      duration: be,
      pitch: notes[randomInteger(0, noteCount - 1, repeatControl)],
    });
    curLength = curLength + be;
  }
  return beat;
}

function generator({ noteCount, repeatControl, oneBeatFile, beatConst }) {
  let track = new MidiWriter.Track();
  let events = [];

  let beat = randomBeat(beatConst, { noteCount, repeatControl });
  for (let i = 0; i < 4; i++) {
    if (!oneBeatFile) {
      beat = randomBeat(beatConst, {noteCount, repeatControl});
    }
    beat.forEach((one) => {
      events.push(
          new MidiWriter.NoteEvent({
            pitch: one.pitch,
            duration: "T" + one.duration * 4,
          })
      );
    });
  }

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
