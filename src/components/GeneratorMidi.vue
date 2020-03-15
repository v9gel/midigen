<template>
    <div>
        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" label-width="250px">
            <el-form-item label="Входной ритм" prop="beat">
                <el-input type="textarea" v-model="ruleForm.beat" :disabled="ruleForm.isRandomBeat"></el-input>
                <el-button type="default" @click="randomBeat()" :disabled="ruleForm.isRandomBeat" style="margin-top: 25px">Сгенерировать рандомный ритм</el-button>
            </el-form-item>

            <el-form-item label="Рандомный ритм для фрагментов" prop="repeatControl">
                <el-switch v-model="ruleForm.isRandomBeat"></el-switch>
            </el-form-item>

            <el-form-item label="Диапазон нот" prop="noteCount">
                <el-input-number v-model="ruleForm.noteCount" :min="2" :max="14"></el-input-number>
            </el-form-item>
            <el-form-item label="Предотвращать повторы" prop="repeatControl">
                <el-switch v-model="ruleForm.repeatControl"></el-switch>
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

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Сохранить трек</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import generator from "./generator";

    export default {
        name: "GeneratorMidi",
        data() {
            return {
                ruleForm: {
                    beat: '1 2',
                    noteCount: 14,
                    repeatControl: true,
                    restEnable: true,
                    trackLength: 5,
                    typeLength: 'note',
                    isRandomBeat: false
                },
                rules: {
                    beat: [
                        {required: true, pattern: /^([ ]*[0-9]*[ ]*)*$/gs, message: 'Ритм должен содержать только числа, разделенные пробелом в одну строку', trigger: 'blur' },
                    ]
                },
                options: [{
                    value: 'sec',
                    label: 'Секунд'
                }, {
                    value: 'note',
                    label: 'Нот'
                }]
            };
        },
        methods:{
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let beat = [];
                        this.ruleForm.beat.split(' ').forEach(element => {
                            beat.push(parseInt(element));
                        });


                        let params = Object.assign({}, this.ruleForm);
                        params.beat = beat.filter(function (value) {
                            return !Number.isNaN(value);
                        });
                        console.log(params.beat);

                        let content = generator(params).substr(23);
                        var uriContent = "data:audio/midi;base64," + encodeURIComponent(content);
                        window.open(uriContent);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>