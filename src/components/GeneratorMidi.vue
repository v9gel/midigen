<template>
    <div>
        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="250px">
            <el-form-item label="Входной ритм" prop="beat">
                <el-input type="textarea" v-model="ruleForm.beat" :disabled="ruleForm.isRandomBeat"></el-input>
                <el-button type="default" @click="randomBeat()" :disabled="ruleForm.isRandomBeat" style="margin-top: 25px">Сгенерировать рандомный ритм</el-button>
            </el-form-item>
            <el-form-item label="Используемые длительности" prop="beatConst">
                <el-input type="textarea" v-model="ruleForm.beatConst"></el-input>
            </el-form-item>

            <el-form-item label="Рандомный ритм для фрагментов" prop="repeatControl">
                <el-switch v-model="ruleForm.isRandomBeat"></el-switch>
            </el-form-item>
            <el-form-item label="Один бит на файл" prop="oneBeatFile">
                <el-switch v-model="ruleForm.oneBeatFile"></el-switch>
            </el-form-item>
            <el-form-item label="Диапазон нот" prop="noteCount">
                <el-input-number v-model="ruleForm.noteCount" :min="1" :max="14"></el-input-number>
            </el-form-item>
            <el-form-item label="Длинна ритма" prop="beatLength">
                <el-input-number v-model="ruleForm.beatLength" :min="1" :max="128"></el-input-number> / 32 такта
            </el-form-item>
            <el-form-item label="Предотвращать повторы" prop="repeatControl">
                <el-switch v-model="ruleForm.repeatControl" :disabled="ruleForm.noteCount === 1"></el-switch>
            </el-form-item>
            <el-form-item label="Короткие ноты" prop="shortNote">
                <el-switch v-model="ruleForm.shortNote"></el-switch>
            </el-form-item>
            <el-form-item label="Пауза после ритма" prop="restEnable">
                <el-switch v-model="ruleForm.restEnable"></el-switch>
            </el-form-item>

            <el-form-item label="Длина трека" prop="trackLength">
                <el-input-number v-model="ruleForm.trackLength" :min="1" :max="10000"></el-input-number>

                <el-select v-model="ruleForm.typeLength" placeholder="Select" style="margin-left: 20px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Количество файлов" prop="filesCount">
                <el-input-number v-model="ruleForm.filesCount" :min="1" :max="50"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Сгенерировать</el-button>
                <el-button type="default" @click="saveConfig('ruleForm')">Запомнить конфиг</el-button>
            </el-form-item>
        </el-form>

        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="250px">
            <el-form-item label="Скорость воспроизведения">
                <el-input-number v-model="ruleForm.speed" @change="changeSpeed" :min="1" :max="1024"></el-input-number>
            </el-form-item>
        </el-form>
        <el-button type="danger" @click="downloadAll">Скачать все</el-button>
        <ul v-for="(track, i) in tracks" :key="i">
            <Track :track="track" :speed="ruleForm.speed"/>
        </ul>
    </div>
</template>

<script>
    import generator from "./generator";
    import { v4 as uuidv4 } from 'uuid';
    // import * as JSZip from "jszip";
    import Track from "@/components/Track";

    // eslint-disable-next-line no-unused-vars
    function uu(){
        return uuidv4();
    }

    export default {
        name: "GeneratorMidi",
        components: {Track},
        computed: {
          speed(){
              return this.store.speed;
          }
        },
        data() {
            return {
                ruleForm: {
                    beat: '2 4 8',
                    noteCount: 14,
                    beatConst: "2 4 8",
                    repeatControl: true,
                    restEnable: true,
                    beatLength: 32,
                    shortNote: true,
                    trackLength: 5,
                    typeLength: 'note',
                    isRandomBeat: false,
                    filesCount: 2,
                    speed: 30,
                    oneBeatFile: false
                },
                tracks: [],
                rules: {
                    beat: [
                        {required: true, pattern: /^([ ]*[0-9]*[ ]*)*$/gs, message: 'Ритм должен содержать только числа, разделенные пробелом в одну строку', trigger: 'blur' },
                    ],
                    beatConst: [
                        {required: true, pattern: /^([ ]*[0-9]*[ ]*)*$/gs, message: 'Допустимые длительности только числа, разделенные пробелом в одну строку', trigger: 'blur' },
                    ]
                },
                options: [{
                    value: 'sec',
                    label: 'Секунд'
                }, {
                    value: 'note',
                    label: 'Нот'
                }, {
                    value: 'beat',
                    label: 'Ритмов'
                }],
                options1: [{
                    value: '2',
                    label: '2'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '8',
                    label: '8'
                }]
            };
        },
        methods:{
            downloadAll(){
                this.$root.$emit('all download');
            },
            changeSpeed(value){
                this.$root.$emit('all stop');
                this.$store.commit('changeSpeed', value);
            },
            randomBeat(){
                function randomInteger(min, max) {
                    let rand = min - 0.5 + Math.random() * (max - min + 1);
                    return  Math.round(rand);
                }
                const beatConst = [2,4,8];
                let curLength = 0;
                this.ruleForm.beat = '';
                while(curLength < 64){
                    let be = beatConst[randomInteger(0,2)];
                    this.ruleForm.beat = this.ruleForm.beat + be + ' ';
                    curLength = curLength + be;
                    if(randomInteger(0,20) < 10 && curLength > 16){
                        break;
                    }
                }
            },
            saveConfig(formName){
                console.log(1)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$root.$localStorage.set('config', this.ruleForm);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(formName) {
                this.$root.$emit('all stop');
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let beat = [];
                        this.ruleForm.beat.split(' ').forEach(element => {
                            beat.push(parseInt(element));
                        });

                        let beatConst = [];
                        this.ruleForm.beatConst.split(' ').forEach(element => {
                            beatConst.push(parseInt(element));
                        });

                        let params = Object.assign({}, this.ruleForm);
                        params.beat = beat.filter(function (value) {
                            return !Number.isNaN(value);
                        });
                        params.beatConst = beatConst.filter(function (value) {
                            return !Number.isNaN(value);
                        });

                        if(params.filesCount === 1){
                            let content = generator(params, false);
                            this.tracks = [content];
                        }else {
                            this.tracks = [];
                            for(let i = 0; i < params.filesCount; i++){
                                let content = generator(params, false);
                                this.tracks.push(content);
                            }
                        }

                        this.$root.$emit('name generate', () => {

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted(){
            console.log( this.$root.$localStorage.get('config'));
            if(this.$root.$localStorage.get('config') !== null){
                this.ruleForm =  this.$root.$localStorage.get('config');
            }
        }
    }
</script>

<style scoped>

</style>