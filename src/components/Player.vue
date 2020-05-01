<template>
  <div></div>
</template>

<script>
import Soundfont from "soundfont-player";
import MidiPlayer from "midi-player-js";

export default {
  name: "Player",
  data() {
    return {
      played: -1,
    };
  },
  props: ["speed"],
  computed: {
    tracks() {
      return this.$store.state.tracks;
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
    this.$root.$on("play", (e) => {
      vue.played = e;
      vue.play();
    });
  },
  destroyed() {
    this.stop();
  },
  stop() {
    this.played = -1;
    this.$root.$emit("all stop");
  },
  methods: {
    async play() {
      this.$root.$emit("all stop");
      const AudioContext =
        window.AudioContext || window.webkitAudioContext || false;
      const ac = new AudioContext();
      let vue = this;
      Soundfont.instrument(ac, `voice_oohs`).then(
        (instrument) => {
          let Player = new MidiPlayer.Player(function (event) {
            if (vue.played === -1) {
              Player.stop();
            }
            if (event.name === "Note on" && event.velocity > 0) {
              console.log(event)
              instrument.play(event.noteName, ac.currentTime, {
                gain: event.velocity,
              });
            }
          });

          Player.loadDataUri(vue.tracks[vue.played].track);
          Player.play();
          Player.setTempo(vue.speed);
          vue.$root.$on("all stop", () => {
            Player.stop();
          });
          Player.on("endOfFile", function () {
            vue.$root.$emit("all stop");
            setTimeout(function () {
              vue.$root.$emit("all stop");
              if (vue.played+1 > vue.tracks.length) {
                vue.$root.$emit("all stop");
              } else {
                vue.$root.$emit("play", vue.played + 1);
              }
            }, 2000);
          });
        }
      );
    },
  },
};
</script>

<style scoped></style>
