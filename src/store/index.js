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
        let tmpBeat = [];
        let name = tmp.name.substr(0, 12) + "_" + uid.randomUUID(6) + ".mid";

        let track = new MidiWriter.Track();
        let events = [];

        let oldPitch = "";
        ruleForm = {
          beatConst: ["2", "4"],
          noteConst: ["C4", "D4", "E4"],
          repeatControl: true,
          filesCount: 1,
          speed: 30,
        };

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
          tmpBeat.push({ pitch: curPitch, duration: tmp.beat[i].duration });
          oldPitch = curPitch;
        }

        console.log(tmp);

        tmpBeat.forEach((one) => {
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

        state.tracks.push({
          beat: tmpBeat,
          name: name,
          track: write.dataUri(),
        });

        Vue.$localStorage.set("tracks", state.tracks);
      }
    },

    generateBeat(state, ruleForm) {
      if (ruleForm.flagRecord) {
        let tmp = ruleForm.beat;
        let help = [];
        let name = "track_" + uid.randomUUID(6) + ".mid";

        let track = new MidiWriter.Track();
        let events = [];
        tmp.forEach((one) => {
          events.push(
            new MidiWriter.NoteEvent({
              pitch: "C4",
              duration: "T" + one * 4,
            })
          );
          help.push({
            pitch: "C4",
            duration: one,
          });
        });

        track.setTempo(30).addEvent(events, function (event, index) {
          event;
          index;
          return { sequential: true };
        });

        let write = new MidiWriter.Writer(track);

        state.tracks.push({ beat: help, name: name, track: write.dataUri() });
      } else {
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
      }
      Vue.$localStorage.set("tracks", state.tracks);
    },
  },
  actions: {},
  modules: {},
});
