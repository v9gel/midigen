var MidiWriter = require('midi-writer-js');

var oldNoteNumber = -10;
function randomInteger(min, max, isRepeatedControl) {
    if(min === max) {
        return 0;
    }else {
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

function randomBeat(beatLeangth) {
    beatLeangth = beatLeangth * 4;
    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return  Math.round(rand);
    }
    const beatConst = [2,4,8];

    let curLength = 0;
    let beat = [];
    while(curLength <= beatLeangth - 8){
        let be = beatConst[randomInteger(0,2)];
        beat.push(be);
        curLength = curLength + be;
        // if(randomInteger(0,20) < 10 && curLength > 16){
        //     break;
        // }
    }

    if(curLength === beatLeangth - 6){
        beat.push(2);
        beat.push(4);
        curLength += 6;
    }else if(curLength === beatLeangth - 4){
        beat.push(4);
        curLength += 4;
    }else if(curLength === beatLeangth - 2){
        beat.push(2);
        curLength += 2;
    }
    // console.log('li', curLength);

    // if(curLength - 64 > 0){
    //     beat[beat.length-1] = beat[beat.length-1]  - (curLength - 64);
    //     console.log('li', beat[beat.length-1]);
    // }
    return beat;
}

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

function generator({beat, noteCount, repeatControl, trackLength, typeLength, restEnable, isRandomBeat, shortNote, beatLength, oneBeatFile}, returnArray) {
    let track = new MidiWriter.Track();
    let events = [];

    if (typeLength === 'sec') {
        trackLength = trackLength * 32;
    }

    let curS = 0;
    beat = randomBeat(beatLength);
    for (let i = 0; i < trackLength;){
        if(isRandomBeat && !oneBeatFile){
            beat = randomBeat(beatLength);
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

