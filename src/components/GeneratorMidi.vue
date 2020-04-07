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
    <el-table :data="tracks" style="width: 100%;">
      <el-table-column label="Название" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Бит">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>Длительности: {{ scope.row.beat.map((e) => e.duration) }}</p>
            <p>Звуковысоты: {{ scope.row.beat.map((e) => e.pitch) }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{
                scope.row.beat.map((e) => e.duration)
              }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Действия" style="width: 180px;">
        <template slot="header" slot-scope="scope">
          BPM
          <el-input-number
            v-model="ruleForm.speed"
            @change="changeSpeed"
            :min="1"
            :max="1024"
            size="mini"
            controls-position="right"
          ></el-input-number>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Play</el-button
          >
          <el-button
            size="mini"
            @click="handleDownload(scope.row.name, scope.row.track)"
            >Download</el-button
          >
          <el-button size="mini" @click="handleAdd(scope.$index, scope.row)"
            >Add {{ ruleForm.filesCount }}</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "GeneratorMidi",
  computed: {
    speed() {
      return this.store.speed;
    },
    tracks() {
      console.log(this.$store.tracks);
      return this.$store.state.tracks;
    },
  },
  data() {
    return {
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
    downloadAll() {
      this.$root.$emit("all download");
    },
    handleDownload(name, track) {
      let link = document.createElement("a");
      link.download = name;
      link.href = track;
      link.click();
    },
    handleDelete(index) {
      this.$store.commit("delete", index);
    },
    handleAdd(index, row) {
      this.$store.commit("add", { index, ruleForm: this.ruleForm });
    },

    changeSpeed(value) {
      this.$root.$emit("all stop");
      this.$store.commit("changeSpeed", value);
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
  mounted() {
    if (this.$root.$localStorage.get("config") !== null) {
      this.ruleForm = this.$root.$localStorage.get("config");
    }
  },
};
</script>

<style scoped></style>
