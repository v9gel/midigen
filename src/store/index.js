import Vue from "vue";
import Vuex from "vuex";
import { randomBeat, getRandomElement } from "../components/helpers";
import ShortUniqueId from "short-unique-id";
import MidiWriter from "midi-writer-js";
const uid = new ShortUniqueId();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    speed: 30,
    tracks: [],
  },
  mutations: {
    start(state, value) {
      state.tracks = value;
    },
    changeSpeed(state, value) {
      state.speed = value;
    },
    delete(state, value) {
      state.tracks.splice(value, 1);
      Vue.$localStorage.set("tracks", state.tracks);
    },
    add(state, { index, ruleForm }) {
      for (let i = 0; i < ruleForm.filesCount; i++) {
        let tmp = Object.assign({}, state.tracks[index]);

        let name = tmp.name.substr(0, 12) + "_" + uid.randomUUID(6) + ".mid";

        let track = new MidiWriter.Track();
        let events = [];

        let oldPitch = "";
        for (let i = 0; i < tmp.beat.length; i++) {
          let curPitch = getRandomElement(ruleForm.noteConst);
          if (
            ruleForm.repeatControl &&
            curPitch === oldPitch &&
            ruleForm.noteConst.length > 1
          ) {
            curPitch = getRandomElement(
              ruleForm.noteConst.filter((e) => e != oldPitch)
            );
          }
          tmp.beat[i].pitch = curPitch;
          oldPitch = curPitch;
        }

        console.log(tmp);

        tmp.beat.forEach((one) => {
          events.push(
            new MidiWriter.NoteEvent({
              pitch: one.pitch,
              duration: "T" + one.duration * 4,
            })
          );
        });

        track.setTempo(30).addEvent(events, function (event, index) {
          event;
          index;
          return { sequential: true };
        });

        let write = new MidiWriter.Writer(track);

        state.tracks.splice(index, 0, {
          beat: tmp.beat,
          name: name,
          track: write.dataUri(),
        });

        Vue.$localStorage.set("tracks", state.tracks);
      }
    },
    generateBeat(state, ruleForm) {
      for (let i = 0; i < ruleForm.filesCount; i++) {
        ruleForm.noteConst = ["C4"];
        let tmp = randomBeat(
          ruleForm.beatConst,
          ruleForm.noteConst,
          ruleForm.repeatControl
        );
        let name = "track_" + uid.randomUUID(6) + ".mid";

        let track = new MidiWriter.Track();
        let events = [];
        tmp.forEach((one) => {
          events.push(
            new MidiWriter.NoteEvent({
              pitch: one.pitch,
              duration: "T" + one.duration * 4,
            })
          );
        });

        track.setTempo(30).addEvent(events, function (event, index) {
          event;
          index;
          return { sequential: true };
        });

        let write = new MidiWriter.Writer(track);

        state.tracks.push({ beat: tmp, name: name, track: write.dataUri() });
      }
      Vue.$localStorage.set("tracks", state.tracks);
    },
  },
  actions: {},
  modules: {},
});
