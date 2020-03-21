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
    const beatConst = [2,4,8];

    let curLength = 0;
    let beat = [];
    while(curLength < 64){
        let be = beatConst[randomInteger(0,2)];
        beat.push(beatConst[randomInteger(0,2)]);
        curLength = curLength + be;
        if(randomInteger(0,20) < 10 && curLength > 16){
            break;
        }
    }
    return beat;
}

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

function generator({beat, noteCount, repeatControl, trackLength, typeLength, restEnable, isRandomBeat, shortNote}, returnArray) {
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
                            duration: shortNote === true ? 'T4' : 'T' + r * 8,
                            startTick: curS
                    })
                );
                curS = curS+r*8;
            }
            if(typeLength === 'note') {
                i++;
            }
            else if (typeLength === 'sec') {
                i = i + r;
            }
        });
        if(typeLength === 'beat') {
            i++;
        }
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
    if(returnArray){
        return write.buildFile();
    }
    else{
        return write.dataUri();
    }
}

export default generator;

