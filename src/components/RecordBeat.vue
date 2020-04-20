<template>
  <div>
    <div class="hello">
      <p v-if="!start">
        Для начала записи кликните по этому тексту и начните настукивать ритм c
        помощью клавиши Пробел
      </p>
      <p v-if="start">
        Идет запись...
      </p>
      <p>Скорость 30BPM</p>
      <p>Ритм: {{ beat.map((e) => Math.round(e / 65.5)) }}</p>
      <el-button :disabled="beat.length === 0" type="primary" @click="end"
        >Добавить ритм в коллекцию</el-button
      >
      <el-button :disabled="beat.length === 0" @click="reset"
        >Сбросить</el-button
      >
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "RecordBeat",
  data() {
    return {
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
