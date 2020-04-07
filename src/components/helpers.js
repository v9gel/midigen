export function getRandomElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomBeat(_beatConst, _noteConst, repeatControl = true) {
  let beatConst = Object.assign([], _beatConst).map((e) => parseInt(e));
  let noteConst = Object.assign([], _noteConst);

  let beatLength = 128;

  let curLength = 0;
  let beat = [];
  let oldPitch = "";
  while (curLength < beatLength) {
    let curDuration = getRandomElement(beatConst);
    if (curLength + curDuration > beatLength) {
      curDuration = beatLength - curLength;
    }
    let curPitch = getRandomElement(noteConst);
    if (repeatControl && curPitch === oldPitch && noteConst.length > 1) {
      curPitch = getRandomElement(noteConst.filter((e) => e != oldPitch));
    }
    oldPitch = curPitch;
    beat.push({
      duration: curDuration,
      pitch: curPitch,
    });
    curLength = curLength + curDuration;
  }
  return beat;
}
