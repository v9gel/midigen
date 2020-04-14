<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
      >Сгенерировать новый ритм</el-button
    >

    <el-dialog
      title="Запись нового ритма"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        label-position="left"
        :rules="rules"
        ref="ruleForm"
        label-width="205px"
      >
        <el-form-item label="Используемые длительности" prop="beatConst">
          <el-select
            v-model="ruleForm.beatConst"
            allow-create
            filterable
            default-first-option
            multiple
            placeholder="Select"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Используемые ноты" prop="noteConst">
          <el-select
            v-model="ruleForm.noteConst"
            multiple
            default-first-option
            placeholder="Select"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Предотвращать повторы" prop="repeatControl">
          <el-switch
            v-model="ruleForm.repeatControl"
            :disabled="ruleForm.noteCount === 1"
          ></el-switch>
        </el-form-item>

        <el-form-item label="Количество файлов" prop="filesCount">
          <el-input-number
            v-model="ruleForm.filesCount"
            :min="1"
            :max="50"
          ></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Сгенерировать</el-button
          >
          <el-button type="default" @click="saveConfig('ruleForm')"
            >Запомнить конфиг</el-button
          >
        </el-form-item>
      </el-form>

      <el-form
        :model="ruleForm"
        label-position="left"
        :rules="rules"
        ref="ruleForm"
        label-width="205px"
      >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GenerateBeat",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        beatConst: ["2", "4"],
        noteConst: ["C4", "D4", "E4"],
        repeatControl: true,
        filesCount: 2,
        speed: 30,
      },
      options1: [
        {
          value: "2",
          label: "2",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "8",
          label: "8",
        },
      ],
      options2: [
        {
          value: "C4",
          label: "C4",
        },
        {
          value: "D4",
          label: "D4",
        },
        {
          value: "E4",
          label: "E4",
        },
        {
          value: "F4",
          label: "F4",
        },
        {
          value: "G4",
          label: "G4",
        },
        {
          value: "A4",
          label: "A4",
        },
        {
          value: "B4",
          label: "B4",
        },
        {
          value: "C5",
          label: "C5",
        },
        {
          value: "D5",
          label: "D5",
        },
        {
          value: "E5",
          label: "E5",
        },
        {
          value: "F5",
          label: "F5",
        },
        {
          value: "G5",
          label: "G5",
        },
        {
          value: "A5",
          label: "A5",
        },
        {
          value: "B5",
          label: "B5",
        },
      ],
      rules: {},
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("Подтвердите закрытие диалога")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    saveConfig(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$root.$localStorage.set("config", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$root.$emit("all stop");

      this.$store.commit("generateBeat", Object.assign({}, this.ruleForm));
    },
  },
};
</script>

<style scoped></style>
