var MidiWriter = require('midi-writer-js');

var oldNoteNumber = -10;
function randomInteger(min, max, isRepeatedControl) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    let value = Math.round(rand);

    if(isRepeatedControl){
        if(value === oldNoteNumber) {
            return randomInteger(min, max, isRepeatedControl);
        }
        else{
            oldNoteNumber = value;
            return value;
        }
    }
    else {
        return value;
    }
}

function randomBeat() {
    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return  Math.round(rand);
    }

    let randomLenth = randomInteger(5, 25);
    let beat = [];
    for(let i = 0; i < randomLenth; i++){
        beat.push(randomInteger(1,32));
    }
    return beat;
}

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

function generator({beat, noteCount, repeatControl, trackLength, typeLength, restEnable, isRandomBeat}) {
    let track = new MidiWriter.Track();
    let events = [];

    if (typeLength === 'sec') {
        trackLength = trackLength * 32;
    }

    let curS = 0;
    for (let i = 0; i < trackLength;){
        if(isRandomBeat){
            beat = randomBeat();
        }

        beat.forEach(r => {
            if(i < trackLength) {
                events.push(
                    new MidiWriter.NoteEvent({
                        pitch: [
                            notes[randomInteger(0,noteCount-1, repeatControl)]],
                            duration: 'T' + (r * 8),
                            startTick: restEnable === true ? curS : null
                    })
                );
                if(restEnable){
                    curS = curS+r*8;
                }
            }
            if(typeLength === 'note') {
                i++;
            }
            else if (typeLength === 'sec') {
                i = i + r;
            }
        });
        if (typeLength === 'sec' && restEnable) {
            i = i + 16;
        }
        if(restEnable){
            curS = curS+128;
        }
    }

    track.setTempo(30).addEvent(events, function(event, index) {
            event;
            index;
            return {sequential: true};
        }
    );

    var write = new MidiWriter.Writer(track);
    return write.dataUri();
}

export default generator;
//
// var ritm = [1,2,4,8,4,6];
// var diap = 3;
// generator(ritm, diap, true, 56, 'note');


