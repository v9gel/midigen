<template>
  <li v-on:allStop="stop">
    {{ name }}
    <el-button-group style="margin-right: 0">
      <el-button size="small" type="primary" v-if="!playing" @click="play"
        >play</el-button
      >
      <el-button size="small" type="danger" v-if="playing" @click="stop"
        >stop</el-button
      >
      <el-button
        size="small"
        type="primary"
        @click="download"
        icon="el-icon-download"
      ></el-button>
    </el-button-group>
  </li>
</template>

<script>
import MidiWriter from "midi-writer-js";
import MidiPlayer from "midi-player-js";
import Soundfont from "soundfont-player";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId();

export default {
  name: "Track",
  data() {
    return {
      playing: false,
      name: (this.name = "track" + uid.randomUUID(6) + ".mid"),
      track: "",
    };
  },
  props: ["beat", "firstLevel", "speed", "index", "noteConst"],
  methods: {
    async play() {
      this.$root.$emit("all stop");
      this.playing = true;
      const AudioContext =
        window.AudioContext || window.webkitAudioContext || false;
      const ac = new AudioContext();

      let vue = this;

      Soundfont.instrument(ac, `acoustic_grand_piano-mp3.js`).then(
        (instrument) => {
          let Player = new MidiPlayer.Player(function (event) {
            if (!vue.playing) {
              Player.stop();
            }
            if (event.name === "Note on" && event.velocity > 0) {
              instrument.play(event.noteName, ac.currentTime, {
                gain: event.velocity / 100,
                duration: 1,
              });
            }
          });

          Player.loadDataUri(vue.track);
          Player.play();
          Player.setTempo(vue.speed);
          vue.$root.$on("all stop", () => {
            Player.stop();
          });
          Player.on("endOfFile", function () {
            vue.stop();
            setTimeout(function () {
              vue.$root.$emit("play", vue.index + 1);
            }, 2000);
          });
        }
      );
    },
    stop() {
      this.playing = false;
    },
    midiGeneration() {
      let track = new MidiWriter.Track();
      let events = [];
      this.beat.forEach((one) => {
        if (this.firstLevel) {
          one.pitch = "C4";
        }
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
      this.track = write.dataUri();
    },
    async download() {
      let link = document.createElement("a");
      link.download = this.name;
      link.href = this.track;
      link.click();
    },
  },
  mounted() {
    let vue = this;
    this.$root.$on("all stop", () => {
      vue.stop();
    });
    this.$root.$on("all download", () => {
      vue.stop();
      this.download();
    });
    vue.$root.$on("name generate", () => {
      this.name = "track" + uid.randomUUID(6) + ".mid";
    });
    vue.$root.$on("play", (e) => {
      if (e === vue.index) {
        this.play();
      }
    });

    this.midiGeneration();
  },
  destroyed() {
    this.stop();
  },
};
</script>

<style scoped></style>
