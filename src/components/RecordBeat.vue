<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
      >Записать новый ритм</el-button
    >

    <el-dialog
      title="Запись нового ритма"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="hello">
        <p v-if="!start">
          Для начала записи начните настукивать ритм c помощью клавиши Пробел
        </p>
        <p v-if="start">
          Идет запись...
        </p>
        <p>Скорость 30BPM</p>
        <p>Ритм: {{ beat.map((e) => Math.round(e / 65.5)) }}</p>
        <el-button @click="reset">Сбросить</el-button
        ><el-button @click="end">Стоп</el-button>
        <br />
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RecordBeat",
  data() {
    return {
      dialogVisible: false,
      i: 1,
      beat: [],
      start: false,
      stop: false,
      startTime: null,
      lastNote: null,
    };
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.code == "Space") {
        this.down();
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code == "Space") {
        this.up();
      }
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("Подтвердите закрытие диалога")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    reset() {
      this.i = 1;
      this.beat = [];
      this.start = false;
      this.stop = false;
      this.startTime = null;
      this.lastNote = null;
    },
    end() {
      let b = this.beat.map((e) => Math.round(e / 65.5));
      b.pop();
      this.$store.commit("generateBeat", { flagRecord: true, beat: b });
      this.reset();
    },
    down() {
      if (!this.start) {
        this.start = true;
        this.startTime = Date.now();
        this.lastNote = this.startTime;
      }
    },
    up() {
      let tmp = Date.now();
      this.beat.push(tmp - this.lastNote);
      this.lastNote = tmp;
      this.i++;
    },
  },
};
</script>

<style scoped></style>
