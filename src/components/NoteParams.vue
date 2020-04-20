<template>
  <el-form
    :model="ruleForm"
    label-position="left"
    :rules="rules"
    ref="ruleForm"
    label-width="205px"
  >
    <el-form-item label="Используемые ноты" prop="noteConst">
      <el-select
        v-model="ruleForm.noteConst"
        multiple
        default-first-option
        placeholder="Выберите ноты"
        @change="onChangeNoteConst"
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
        @change="onChangeRepeatControl"
        :disabled="ruleForm.noteConst.length === 1"
      ></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "NoteParams",
  data() {
    return {
      ruleForm: {
        noteConst: ["C4", "D4", "E4"],
        repeatControl: true,
      },
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
  mounted() {
    this.onChangeNoteConst();
    this.onChangeRepeatControl();
  },
  methods: {
    onChangeNoteConst() {
      this.$store.commit(
        "changeNoteConst",
        Object.assign({}, this.ruleForm.noteConst)
      );
    },
    onChangeRepeatControl() {
      this.$store.commit(
        "changeRepeatControl",
        Object.assign({}, this.ruleForm.repeatControl)
      );
    },
  },
};
</script>

<style scoped></style>
