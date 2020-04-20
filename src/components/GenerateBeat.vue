<template>
  <div>
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

      <el-form-item label="Количество файлов" prop="filesCount">
        <el-input-number
          v-model="ruleForm.filesCount"
          :min="1"
          :max="50"
        ></el-input-number>
      </el-form-item>

      <el-button type="primary" @click="submitForm('ruleForm')"
        >Сгенерировать ритмы в колекцию</el-button
      >
      <el-button type="default" @click="saveConfig('ruleForm')"
        >Запомнить конфиг</el-button
      >
    </el-form>

    <el-form
      :model="ruleForm"
      label-position="left"
      :rules="rules"
      ref="ruleForm"
      label-width="205px"
    >
    </el-form>
  </div>
</template>

<script>
export default {
  name: "GenerateBeat",
  data() {
    return {
      ruleForm: {
        beatConst: ["2", "4"],
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
      rules: {},
    };
  },
  mounted() {
    if (this.$root.$localStorage.get("config") !== null) {
      this.ruleForm = this.$root.$localStorage.get("config");
    }
  },
  methods: {
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
