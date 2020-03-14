<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
            <el-form-item label="Входной ритм" prop="beat">
                <el-input type="textarea" v-model="ruleForm.beat"></el-input>
            </el-form-item>
            <el-form-item label="Диапазон нот" prop="noteCount">
                <el-input-number v-model="ruleForm.noteCount" :min="2" :max="14"></el-input-number>
            </el-form-item>
            <el-form-item label="Предотвращать повторы" prop="repeatControl">
                <el-switch v-model="ruleForm.repeatControl"></el-switch>
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
    import generator from "@/components/generator";

    export default {
        name: "Generator",
        data() {
            return {
                ruleForm: {
                    beat: '1 2',
                    noteCount: 14,
                    repeatControl: true,
                    trackLength: 5,
                    typeLength: 'note'
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
                        // let content = 'TVRoZAAAAAYAAAABAIBNVHJrAAAAZACQPkAIgD5AAJBAQBCAQEAAkD5AIIA+QACQPEBAgDxAAJA+QCCAPkAAkD5AMIA+QACQPEAIgDxAAJA+QBCAPkAAkDxAIIA8QACQPkBAgD5AAJA+QCCAPkAAkEBAMIBAQAD/LwA=';
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