<template>
    <li v-on:allStop="stop">
        {{name}}
        <el-button-group>
            <el-button size="small" type="primary" v-if="!playing" @click="play">play</el-button>
            <el-button size="small" type="danger" v-if="playing" @click="stop">stop</el-button>
            <el-button size="small" type="primary" @click="download" icon="el-icon-download"></el-button>
        </el-button-group>
    </li>
</template>

<script>
    import MidiPlayer from 'midi-player-js';
    import Soundfont from 'soundfont-player';
    import { v4 as uuidv4 } from 'uuid';
    // import { save } from 'save-file'

    export default {
        name: "Track",
        data() {
            return {
                playing: false,
                name: this.name = 'track' + uuidv4() + '.mid'
            }
        },
        // computed: {
        //     speed(){
        //         return this.store.speed;
        //     }
        // },
        props: ['track', 'speed'],
        methods: {
            async play(){
                this.$root.$emit('all stop');
                this.playing = true;
                const AudioContext = window.AudioContext || window.webkitAudioContext || false;
                const ac = new AudioContext;

                let vue = this;
                await setTimeout(function(){
                    Soundfont.instrument(ac, `https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-mp3.js`).then((instrument) => {
                        let Player = new MidiPlayer.Player(function(event) {
                            if (!vue.playing) {
                                Player.stop();
                            }
                            if (event.name === 'Note on' && event.velocity > 0) {
                                instrument.play(event.noteName, ac.currentTime, {
                                    gain: event.velocity / 100,
                                    duration: 1
                                });
                                console.log(event)
                            }
                        });

                        Player.loadDataUri(vue.track);
                        Player.play();
                        Player.setTempo(vue.speed);
                        // Player.setTempo(vue.speed);

                        vue.$root.$on('all stop', () => {
                            Player.stop();
                        });


                        // Player.on('playing', function() {
                        //     if(!vue.playing){
                        //         Player.stop();
                        //     }
                        // });

                        Player.on('endOfFile', function() {
                            vue.stop();
                        });
                    });
                }, 1000);

            },
            stop(){
                this.playing = false;
                // this.$root.$emit('all stop');
            },
            async download(){
                let link = document.createElement('a');
                link.download = this.name;
                link.href = this.track;
                link.click();
            }
        },
        mounted(){
            let vue = this;
            this.$root.$on('all stop', () => {
                vue.stop()
            });
            this.$root.$on('all download', () => {
                vue.stop();
                this.download();
            });
            vue.$root.$on('name generate', () => {
                this.name = 'track' + uuidv4() + '.mid'
            })
        },
        updated(){
            // this.name = 'track-' + uuidv4() + '.mid';
            // let vue = this;
            // eventBus.$on('allStop', () => {
            //     vue.stop()
            // })
        },
        destroyed(){
            this.stop();
        }
    }
</script>

<style scoped>

</style>