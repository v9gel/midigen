<template>
  <div>
    <el-form
      :model="ruleForm"
      label-position="left"
      :rules="rules"
      ref="ruleForm"
      label-width="250px"
    >
      <el-form-item label="Используемые длительности" prop="beatConst">
        <el-input type="textarea" v-model="ruleForm.beatConst"></el-input>
      </el-form-item>

      <el-form-item label="Диапазон нот" prop="noteCount">
        <el-input-number
          v-model="ruleForm.noteCount"
          :min="1"
          :max="14"
        ></el-input-number>
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
      label-width="250px"
    >
      <el-form-item label="Скорость воспроизведения">
        <el-input-number
          v-model="ruleForm.speed"
          @change="changeSpeed"
          :min="1"
          :max="1024"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <el-button type="danger" v-if="tracks.length > 0" @click="downloadAll">Скачать все</el-button>
    <ul v-for="(track, i) in tracks" :key="i">
      <Track :track="track" :index="i" :speed="ruleForm.speed" />
    </ul>
  </div>
</template>

<script>
import generator from "./generator";
import { v4 as uuidv4 } from "uuid";
import getRandomElement from "./helpers";
import Track from "@/components/Track";

// eslint-disable-next-line no-unused-vars
function uu() {
  return uuidv4();
}

export default {
  name: "GeneratorMidi",
  components: { Track },
  computed: {
    speed() {
      return this.store.speed;
    },
  },
  data() {
    return {
      ruleForm: {
        beatConst: "2 4 8",
        noteCount: 14,
        repeatControl: true,
        filesCount: 2,
        speed: 30,
      },
      tracks: [],
      rules: {
        beatConst: [
          {
            required: true,
            pattern: /^([ ]*[0-9]*[ ]*)*$/gs,
            message:
              "Допустимые длительности только числа, разделенные пробелом в одну строку",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    downloadAll() {
      this.$root.$emit("all download");
    },
    changeSpeed(value) {
      this.$root.$emit("all stop");
      this.$store.commit("changeSpeed", value);
    },
    saveConfig(formName) {
      console.log(1);
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
      getRandomElement([1]);
      this.$root.$emit("all stop");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let beatConst = [];
          this.ruleForm.beatConst.split(" ").forEach((element) => {
            beatConst.push(parseInt(element));
          });

          let params = Object.assign({}, this.ruleForm);
          params.beatConst = beatConst.filter(function (value) {
            return !Number.isNaN(value);
          });

          if (params.filesCount === 1) {
            let content = generator(params);
            this.tracks = [content];
          } else {
            this.tracks = [];
            for (let i = 0; i < params.filesCount; i++) {
              let content = generator(params);
              this.tracks.push(content);
            }
          }

          this.$root.$emit("name generate", () => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
