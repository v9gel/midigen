(function(e){function t(t){for(var o,l,i=t[0],u=t[1],s=t[2],p=0,d=[];p<i.length;p++)l=i[p],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&d.push(r[l][0]),r[l]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);c&&c(t);while(d.length)d.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(o=!1)}o&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var o={},r={app:0},a=[];function l(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=o,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var c=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("85ec"),r=n.n(o);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("GeneratorMidi")],1)},a=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-position":"left",rules:e.rules,"label-width":"205px"}},[n("el-form-item",{attrs:{label:"Используемые длительности",prop:"beatConst"}},[n("el-select",{attrs:{"allow-create":"",filterable:"","default-first-option":"",multiple:"",placeholder:"Select"},model:{value:e.ruleForm.beatConst,callback:function(t){e.$set(e.ruleForm,"beatConst",t)},expression:"ruleForm.beatConst"}},e._l(e.options1,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("el-form-item",{attrs:{label:"Используемые ноты",prop:"noteConst"}},[n("el-select",{attrs:{multiple:"","default-first-option":"",placeholder:"Select"},model:{value:e.ruleForm.noteConst,callback:function(t){e.$set(e.ruleForm,"noteConst",t)},expression:"ruleForm.noteConst"}},e._l(e.options2,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("el-form-item",{attrs:{label:"Предотвращать повторы",prop:"repeatControl"}},[n("el-switch",{attrs:{disabled:1===e.ruleForm.noteCount},model:{value:e.ruleForm.repeatControl,callback:function(t){e.$set(e.ruleForm,"repeatControl",t)},expression:"ruleForm.repeatControl"}})],1),n("el-form-item",{attrs:{label:"Количество файлов",prop:"filesCount"}},[n("el-input-number",{attrs:{min:1,max:50},model:{value:e.ruleForm.filesCount,callback:function(t){e.$set(e.ruleForm,"filesCount",t)},expression:"ruleForm.filesCount"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("Сгенерировать")]),n("el-button",{attrs:{type:"default"},on:{click:function(t){return e.saveConfig("ruleForm")}}},[e._v("Запомнить конфиг")])],1)],1),n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-position":"left",rules:e.rules,"label-width":"205px"}}),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tracks,"row-class-name":e.tableRowClassName}},[n("el-table-column",{attrs:{label:"Название",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),n("el-table-column",{attrs:{label:"Бит"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-popover",{attrs:{trigger:"hover",placement:"top"}},[n("p",[e._v("Длительности: "+e._s(t.row.beat.map((function(e){return e.duration}))))]),n("p",[e._v("Звуковысоты: "+e._s(t.row.beat.map((function(e){return e.pitch}))))]),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.beat.map((function(e){return e.duration}))))])],1)])]}}])}),n("el-table-column",{staticStyle:{width:"180px"},attrs:{label:"Действия"},scopedSlots:e._u([{key:"header",fn:function(t){return[e._v(" BPM "),n("el-input-number",{attrs:{min:1,max:1024,size:"mini","controls-position":"right"},on:{change:e.changeSpeed},model:{value:e.ruleForm.speed,callback:function(t){e.$set(e.ruleForm,"speed",t)},expression:"ruleForm.speed"}})]}},{key:"default",fn:function(t){return[t.$index!==e.played?n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handlePlay(t.$index)}}},[e._v("Play")]):e._e(),t.$index===e.played?n("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleStop()}}},[e._v("Stop")]):e._e(),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleDownload(t.row.name,t.row.track)}}},[e._v("Download")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleAdd(t.$index,t.row)}}},[e._v("Add "+e._s(e.ruleForm.filesCount))]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.$index,t.row)}}},[e._v("Delete")])]}}])})],1),n("Player",{attrs:{speed:e.ruleForm.speed}})],1)},i=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},s=[],c=(n("b0c0"),n("96cf"),n("1da1")),p=n("405e"),d=n.n(p),f=n("3f0e"),m=n.n(f),h={name:"Player",data:function(){return{played:-1}},props:["speed"],computed:{tracks:function(){return this.$store.state.tracks}},mounted:function(){var e=this,t=this;this.$root.$on("all stop",(function(){t.stop()})),this.$root.$on("all download",(function(){t.stop(),e.download()})),this.$root.$on("play",(function(e){t.played=e,t.play()}))},destroyed:function(){this.stop()},stop:function(){this.played=-1,this.$root.$emit("all stop")},methods:{play:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,o,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$root.$emit("all stop"),n=window.AudioContext||window.webkitAudioContext||!1,o=new n,r=e,d.a.instrument(o,"acoustic_grand_piano-mp3.js").then((function(e){var t=new m.a.Player((function(n){-1===r.played&&t.stop(),"Note on"===n.name&&n.velocity>0&&e.play(n.noteName,o.currentTime,{gain:n.velocity/100,duration:1})}));t.loadDataUri(r.tracks[r.played].track),t.play(),t.setTempo(r.speed),r.$root.$on("all stop",(function(){t.stop()})),t.on("endOfFile",(function(){r.$root.$emit("all stop"),setTimeout((function(){r.$root.$emit("all stop"),r.played+1>r.tracks.length?r.$root.$emit("all stop"):r.$root.$emit("play",r.played+1)}),2e3)}))}));case 5:case"end":return t.stop()}}),t)})))()}}},b=h,v=n("2877"),$=Object(v["a"])(b,u,s,!1,null,"67f6669b",null),y=$.exports,w={name:"GeneratorMidi",components:{Player:y},computed:{speed:function(){return this.store.speed},tracks:function(){return this.$store.state.tracks}},data:function(){return{ruleForm:{beatConst:["2","4"],noteConst:["C4","D4","E4"],repeatControl:!0,filesCount:2,speed:30},options1:[{value:"2",label:"2"},{value:"4",label:"4"},{value:"8",label:"8"}],options2:[{value:"C4",label:"C4"},{value:"D4",label:"D4"},{value:"E4",label:"E4"},{value:"F4",label:"F4"},{value:"G4",label:"G4"},{value:"A4",label:"A4"},{value:"B4",label:"B4"},{value:"C5",label:"C5"},{value:"D5",label:"D5"},{value:"E5",label:"E5"},{value:"F5",label:"F5"},{value:"G5",label:"G5"},{value:"A5",label:"A5"},{value:"B5",label:"B5"}],rules:{},played:-1}},methods:{downloadAll:function(){this.$root.$emit("all download")},handlePlay:function(e){this.$root.$emit("play",e)},handleStop:function(){this.$root.$emit("all stop")},tableRowClassName:function(e){e.row;var t=e.rowIndex;return t===this.played?"played-row":""},handleDownload:function(e,t){var n=document.createElement("a");n.download=e,n.href=t,n.click()},handleDelete:function(e){this.$store.commit("delete",e)},handleAdd:function(e,t){this.$store.commit("add",{index:e,ruleForm:this.ruleForm})},changeSpeed:function(e){this.$root.$emit("all stop"),this.$store.commit("changeSpeed",e)},saveConfig:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.$root.$localStorage.set("config",t.ruleForm)}))},submitForm:function(e){this.$root.$emit("all stop"),this.$store.commit("generateBeat",Object.assign({},this.ruleForm))}},mounted:function(){var e=this;null!==this.$root.$localStorage.get("config")&&(this.ruleForm=this.$root.$localStorage.get("config")),null!==this.$root.$localStorage.get("tracks")&&this.$store.commit("start",this.$root.$localStorage.get("tracks")),this.$root.$on("play",(function(t){e.played=t,e.play()})),this.$root.$on("all stop",(function(t){e.played=-1}))}},g=w,k=(n("f81b"),Object(v["a"])(g,l,i,!1,null,null,null)),C=k.exports,_={name:"App",components:{GeneratorMidi:C}},F=_,x=(n("034f"),Object(v["a"])(F,r,a,!1,null,null,null)),S=x.exports,O=n("5c96"),j=n.n(O),E=(n("0fae"),n("80f1")),P=n.n(E),D=(n("4de4"),n("4160"),n("a434"),n("159b"),n("2f62"));n("d81d");function T(e){return e[Math.floor(Math.random()*e.length)]}function A(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=Object.assign([],e).map((function(e){return parseInt(e)})),r=Object.assign([],t),a=128,l=0,i=[],u="";while(l<a){var s=T(o);l+s>a&&(s=a-l);var c=T(r);n&&c===u&&r.length>1&&(c=T(r.filter((function(e){return e!=u})))),u=c,i.push({duration:s,pitch:c}),l+=s}return i}var M=n("0b97"),z=n("1f78"),B=n.n(z),G=new M["a"];o["default"].use(D["a"]);var U=new D["a"].Store({state:{speed:30,tracks:[]},mutations:{start:function(e,t){e.tracks=t},changeSpeed:function(e,t){e.speed=t},delete:function(e,t){e.tracks.splice(t,1),o["default"].$localStorage.set("tracks",e.tracks)},add:function(e,t){for(var n=t.index,r=t.ruleForm,a=function(t){for(var a=Object.assign({},e.tracks[n]),l=[],i=a.name.substr(0,12)+"_"+G.randomUUID(6)+".mid",u=new B.a.Track,s=[],c="",p=0;p<a.beat.length;p++){var d=T(r.noteConst);r.repeatControl&&d===c&&r.noteConst.length>1&&(d=T(r.noteConst.filter((function(e){return e!=c})))),l.push({pitch:d,duration:a.beat[p].duration}),c=d}console.log(a),l.forEach((function(e){s.push(new B.a.NoteEvent({pitch:e.pitch,duration:"T"+4*e.duration}))})),u.setTempo(30).addEvent(s,(function(e,t){return{sequential:!0}}));var f=new B.a.Writer(u);e.tracks.push({beat:l,name:i,track:f.dataUri()}),o["default"].$localStorage.set("tracks",e.tracks)},l=0;l<r.filesCount;l++)a(l)},generateBeat:function(e,t){for(var n=function(n){t.noteConst=["C4"];var o=A(t.beatConst,t.noteConst,t.repeatControl),r="track_"+G.randomUUID(6)+".mid",a=new B.a.Track,l=[];o.forEach((function(e){l.push(new B.a.NoteEvent({pitch:e.pitch,duration:"T"+4*e.duration}))})),a.setTempo(30).addEvent(l,(function(e,t){return{sequential:!0}}));var i=new B.a.Writer(a);e.tracks.push({beat:o,name:r,track:i.dataUri()})},r=0;r<t.filesCount;r++)n(r);o["default"].$localStorage.set("tracks",e.tracks)}},actions:{},modules:{}});o["default"].config.productionTip=!1,o["default"].use(j.a),o["default"].use(P.a,{prefix:"your_app_slug_",drivers:["session","local"]}),new o["default"]({store:U,render:function(e){return e(S)}}).$mount("#app")},"85ec":function(e,t,n){},de5f:function(e,t,n){},f81b:function(e,t,n){"use strict";var o=n("de5f"),r=n.n(o);r.a}});
//# sourceMappingURL=app.40f58ba3.js.map