<template>
  <div>
    <el-button-group>
      <RecordBeat></RecordBeat>
      <GenerateBeat></GenerateBeat>
    </el-button-group>
    <el-table
      :data="tracks"
      style="width: 100%;"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="Название" width="250">
        <template slot-scope="scope">
          <span style="margin-left: 10px;"
            >{{ scope.row.name }}
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="default"-->
<!--              icon="el-icon-edit"-->
<!--              click="dialogVisible = true"-->
<!--              circle-->
<!--            ></el-button>-->
          </span>
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
          <el-button
            @click="handlePlay(scope.$index)"
            v-if="scope.$index !== played"
            size="mini"
            >Play</el-button
          >
          <el-button
            @click="handleStop()"
            v-if="scope.$index === played"
            size="mini"
            >Stop</el-button
          >
          <el-button
            size="mini"
            @click="handleDownload(scope.row.name, scope.row.track)"
            >Download</el-button
          >
          <el-button size="mini" @click="handleAdd(scope.$index, scope.row)"
            >Скопировать с рандомной звуковысотой</el-button
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
    <Player :speed="ruleForm.speed"></Player>
  </div>
</template>

<script>
import Player from "./Player";
import RecordBeat from "./RecordBeat";
import GenerateBeat from "./GenerateBeat";
export default {
  name: "GeneratorMidi",
  components: { GenerateBeat, RecordBeat, Player },
  computed: {
    speed() {
      return this.store.speed;
    },
    tracks() {
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
      played: -1,
    };
  },
  methods: {
    downloadAll() {
      this.$root.$emit("all download");
    },
    handlePlay(index) {
      this.$root.$emit("play", index);
    },
    handleStop() {
      this.$root.$emit("all stop");
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === this.played) {
        return "played-row";
      }
      return "";
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
  },
  mounted() {
    if (this.$root.$localStorage.get("config") !== null) {
      this.ruleForm = this.$root.$localStorage.get("config");
    }
    if (this.$root.$localStorage.get("tracks") !== null) {
      this.$store.commit("start", this.$root.$localStorage.get("tracks"));
    }
    this.$root.$on("play", (e) => {
      this.played = e;
      this.play();
    });
    this.$root.$on("all stop", (e) => {
      this.played = -1;
    });
  },
};
</script>

<style>
.el-table .played-row {
  background: #f0f9eb;
}
</style>
