(function(e){function t(t){for(var o,l,i=t[0],s=t[1],u=t[2],p=0,d=[];p<i.length;p++)l=i[p],Object.prototype.hasOwnProperty.call(a,l)&&a[l]&&d.push(a[l][0]),a[l]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);c&&c(t);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(o=!1)}o&&(r.splice(t--,1),e=l(l.s=n[0]))}return e}var o={},a={app:0},r=[];function l(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=o,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var c=s;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("85ec"),a=n.n(o);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("GeneratorMidi")],1)},r=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-collapse",[n("el-collapse-item",{attrs:{title:"Записать ритм",name:"1"}},[n("RecordBeat")],1),n("el-collapse-item",{attrs:{title:"Сгенерировать ритм",name:"2"}},[n("GenerateBeat")],1),n("el-collapse-item",{attrs:{title:"Параметры наложения звуковысоты",name:"3"}},[n("NoteParams")],1)],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tracks,"row-class-name":e.tableRowClassName}},[n("el-table-column",{attrs:{label:"Название",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name)+" ")])]}}])}),n("el-table-column",{attrs:{label:"Бит"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-popover",{attrs:{trigger:"hover",placement:"top"}},[n("p",[e._v("Длительности: "+e._s(t.row.beat.map((function(e){return e.duration}))))]),n("p",[e._v("Звуковысоты: "+e._s(t.row.beat.map((function(e){return e.pitch}))))]),n("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[n("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.beat.map((function(e){return e.duration}))))])],1)])]}}])}),n("el-table-column",{staticStyle:{width:"180px"},attrs:{label:"Действия"},scopedSlots:e._u([{key:"header",fn:function(t){return[e._v(" BPM "),n("el-input-number",{attrs:{min:1,max:1024,size:"mini","controls-position":"right"},on:{change:e.changeSpeed},model:{value:e.ruleForm.speed,callback:function(t){e.$set(e.ruleForm,"speed",t)},expression:"ruleForm.speed"}})]}},{key:"default",fn:function(t){return[t.$index!==e.played?n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handlePlay(t.$index)}}},[e._v("Play")]):e._e(),t.$index===e.played?n("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleStop()}}},[e._v("Stop")]):e._e(),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleDownload(t.row.name,t.row.track)}}},[e._v("Download")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleAdd(t.$index,t.row)}}},[e._v("Скопировать с наложением звуковысоты")]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.$index,t.row)}}},[e._v("Delete")])]}}])})],1),n("Player",{attrs:{speed:e.ruleForm.speed}})],1)},i=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},u=[],c=(n("b0c0"),n("96cf"),n("1da1")),p=n("405e"),d=n.n(p),f=n("3f0e"),m=n.n(f),h={name:"Player",data:function(){return{played:-1}},props:["speed"],computed:{tracks:function(){return this.$store.state.tracks}},mounted:function(){var e=this,t=this;this.$root.$on("all stop",(function(){t.stop()})),this.$root.$on("all download",(function(){t.stop(),e.download()})),this.$root.$on("play",(function(e){t.played=e,t.play()}))},destroyed:function(){this.stop()},stop:function(){this.played=-1,this.$root.$emit("all stop")},methods:{play:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var n,o,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$root.$emit("all stop"),n=window.AudioContext||window.webkitAudioContext||!1,o=new n,a=e,d.a.instrument(o,"voice_oohs").then((function(e){var t=new m.a.Player((function(n){-1===a.played&&t.stop(),"Note on"===n.name&&n.velocity>0&&(console.log(n),e.play(n.noteName,o.currentTime,{gain:n.velocity}))}));t.loadDataUri(a.tracks[a.played].track),t.play(),t.setTempo(a.speed),a.$root.$on("all stop",(function(){t.stop()})),t.on("endOfFile",(function(){a.$root.$emit("all stop"),setTimeout((function(){a.$root.$emit("all stop"),a.played+1>a.tracks.length?a.$root.$emit("all stop"):a.$root.$emit("play",a.played+1)}),2e3)}))}));case 5:case"end":return t.stop()}}),t)})))()}}},b=h,v=n("2877"),C=Object(v["a"])(b,s,u,!1,null,"d8b64380",null),g=C.exports,$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"hello"},[e.start?e._e():n("p",[e._v(" Для начала записи кликните по этому тексту и начните настукивать ритм c помощью клавиши Пробел ")]),e.start?n("p",[e._v(" Идет запись... ")]):e._e(),n("p",[e._v("Скорость 30BPM")]),n("p",[e._v("Ритм: "+e._s(e.beat.map((function(e){return Math.round(e/65.5)}))))]),n("el-button",{attrs:{disabled:0===e.beat.length,type:"primary"},on:{click:e.end}},[e._v("Добавить ритм в коллекцию")]),n("el-button",{attrs:{disabled:0===e.beat.length},on:{click:e.reset}},[e._v("Сбросить")]),n("br")],1)])},w=[],y=(n("d81d"),{name:"RecordBeat",data:function(){return{i:1,beat:[],start:!1,stop:!1,startTime:null,lastNote:null}},created:function(){var e=this;window.addEventListener("keydown",(function(t){"Space"==t.code&&e.down()})),window.addEventListener("keyup",(function(t){"Space"==t.code&&e.up()}))},methods:{reset:function(){this.i=1,this.beat=[],this.start=!1,this.stop=!1,this.startTime=null,this.lastNote=null},end:function(){var e=this.beat.map((function(e){return Math.round(e/65.5)}));e.pop(),this.$store.commit("generateBeat",{flagRecord:!0,beat:e}),this.reset()},down:function(){this.start||(this.start=!0,this.startTime=Date.now(),this.lastNote=this.startTime)},up:function(){var e=Date.now();this.beat.push(e-this.lastNote),this.lastNote=e,this.i++}}}),k=y,_=Object(v["a"])(k,$,w,!1,null,"1846d9e8",null),F=_.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-position":"left",rules:e.rules,"label-width":"205px"}},[n("el-form-item",{attrs:{label:"Используемые длительности",prop:"beatConst"}},[n("el-select",{attrs:{"allow-create":"",filterable:"","default-first-option":"",multiple:"",placeholder:"Выберите длительности"},model:{value:e.ruleForm.beatConst,callback:function(t){e.$set(e.ruleForm,"beatConst",t)},expression:"ruleForm.beatConst"}},e._l(e.options1,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("el-form-item",{attrs:{label:"Количество файлов",prop:"filesCount"}},[n("el-input-number",{attrs:{min:1,max:50},model:{value:e.ruleForm.filesCount,callback:function(t){e.$set(e.ruleForm,"filesCount",t)},expression:"ruleForm.filesCount"}})],1),n("el-button",{attrs:{type:"primary",disabled:0===e.ruleForm.beatConst.length},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("Сгенерировать ритмы в колекцию")]),n("el-button",{attrs:{type:"default"},on:{click:function(t){return e.saveConfig("ruleForm")}}},[e._v("Запомнить конфиг")])],1),n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-position":"left",rules:e.rules,"label-width":"205px"}})],1)},S=[],E={name:"GenerateBeat",data:function(){return{ruleForm:{beatConst:["2","4"],filesCount:2,speed:30},options1:[{value:"2",label:"2"},{value:"4",label:"4"},{value:"8",label:"8"}],rules:{}}},mounted:function(){null!==this.$root.$localStorage.get("config")&&(this.ruleForm=this.$root.$localStorage.get("config"))},methods:{saveConfig:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.$root.$localStorage.set("config",t.ruleForm)}))},submitForm:function(e){this.$root.$emit("all stop"),this.$store.commit("generateBeat",Object.assign({},this.ruleForm))}}},O=E,j=Object(v["a"])(O,x,S,!1,null,"27fff6ce",null),D=j.exports,N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-position":"left",rules:e.rules,"label-width":"205px"}},[n("el-form-item",{attrs:{label:"Используемые ноты",prop:"noteConst"}},[n("el-select",{attrs:{multiple:"","default-first-option":"",placeholder:"Выберите ноты"},on:{change:e.onChangeNoteConst},model:{value:e.ruleForm.noteConst,callback:function(t){e.$set(e.ruleForm,"noteConst",t)},expression:"ruleForm.noteConst"}},e._l(e.options2,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),n("el-form-item",{attrs:{label:"Предотвращать повторы",prop:"repeatControl"}},[n("el-switch",{attrs:{disabled:1===e.ruleForm.noteConst.length},on:{change:e.onChangeRepeatControl},model:{value:e.ruleForm.repeatControl,callback:function(t){e.$set(e.ruleForm,"repeatControl",t)},expression:"ruleForm.repeatControl"}})],1)],1)},B=[],P={name:"NoteParams",data:function(){return{ruleForm:{noteConst:["C4","D4","E4"],repeatControl:!0},options2:[{value:"C4",label:"C4"},{value:"D4",label:"D4"},{value:"E4",label:"E4"},{value:"F4",label:"F4"},{value:"G4",label:"G4"},{value:"A4",label:"A4"},{value:"B4",label:"B4"},{value:"C5",label:"C5"},{value:"D5",label:"D5"},{value:"E5",label:"E5"},{value:"F5",label:"F5"},{value:"G5",label:"G5"},{value:"A5",label:"A5"},{value:"B5",label:"B5"}],rules:{}}},mounted:function(){this.onChangeNoteConst(),this.onChangeRepeatControl()},methods:{onChangeNoteConst:function(){this.$store.commit("changeNoteConst",Object.assign({},this.ruleForm.noteConst))},onChangeRepeatControl:function(){this.$store.commit("changeRepeatControl",Object.assign({},this.ruleForm.repeatControl))}}},T=P,A=Object(v["a"])(T,N,B,!1,null,"65250200",null),G=A.exports,R={name:"GeneratorMidi",components:{NoteParams:G,GenerateBeat:D,RecordBeat:F,Player:g},computed:{speed:function(){return this.store.speed},tracks:function(){return this.$store.state.tracks}},data:function(){return{ruleForm:{beatConst:["2","4"],noteConst:["C4","D4","E4"],repeatControl:!0,filesCount:2,speed:30},options1:[{value:"2",label:"2"},{value:"4",label:"4"},{value:"8",label:"8"}],options2:[{value:"C4",label:"C4"},{value:"D4",label:"D4"},{value:"E4",label:"E4"},{value:"F4",label:"F4"},{value:"G4",label:"G4"},{value:"A4",label:"A4"},{value:"B4",label:"B4"},{value:"C5",label:"C5"},{value:"D5",label:"D5"},{value:"E5",label:"E5"},{value:"F5",label:"F5"},{value:"G5",label:"G5"},{value:"A5",label:"A5"},{value:"B5",label:"B5"}],rules:{},played:-1}},methods:{downloadAll:function(){this.$root.$emit("all download")},handlePlay:function(e){this.$root.$emit("play",e)},handleStop:function(){this.$root.$emit("all stop")},tableRowClassName:function(e){e.row;var t=e.rowIndex;return t===this.played?"played-row":""},handleDownload:function(e,t){var n=document.createElement("a");n.download=e,n.href=t,n.click()},handleDelete:function(e){this.$store.commit("delete",e)},handleAdd:function(e,t){this.$store.commit("add",{index:e,ruleForm:this.ruleForm})},changeSpeed:function(e){this.$root.$emit("all stop"),this.$store.commit("changeSpeed",e)}},mounted:function(){var e=this;null!==this.$root.$localStorage.get("tracks")&&this.$store.commit("start",this.$root.$localStorage.get("tracks")),this.$root.$on("play",(function(t){e.played=t,e.play()})),this.$root.$on("all stop",(function(t){e.played=-1}))}},M=R,U=(n("f81b"),Object(v["a"])(M,l,i,!1,null,null,null)),z=U.exports,I={name:"App",components:{GeneratorMidi:z}},q=I,W=(n("034f"),Object(v["a"])(q,a,r,!1,null,null,null)),J=W.exports,L=n("5c96"),H=n.n(L),K=(n("0fae"),n("80f1")),Q=n.n(K),V=(n("4de4"),n("4160"),n("a434"),n("159b"),n("2f62"));function X(e){return e[Math.floor(Math.random()*e.length)]}function Y(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=Object.assign([],e).map((function(e){return parseInt(e)})),a=Object.assign([],t),r=128,l=0,i=[],s="";while(l<r){var u=X(o);l+u>r&&(u=r-l);var c=X(a);n&&c===s&&a.length>1&&(c=X(a.filter((function(e){return e!=s})))),s=c,i.push({duration:u,pitch:c}),l+=u}return i}var Z=n("0b97"),ee=n("1f78"),te=n.n(ee),ne=new Z["a"];o["default"].use(V["a"]);var oe=new V["a"].Store({state:{speed:30,noteConst:[],repeatControl:!0,tracks:[]},mutations:{changeNoteConst:function(e,t){e.noteConst=t},changeRepeatControl:function(e,t){e.repeatControl=t},start:function(e,t){e.tracks=t},changeSpeed:function(e,t){e.speed=t},delete:function(e,t){e.tracks.splice(t,1),o["default"].$localStorage.set("tracks",e.tracks)},add:function(e,t){for(var n=t.index,a=t.ruleForm,r=function(t){var r=Object.assign({},e.tracks[n]),l=[],i=r.name.substr(0,12)+"_"+ne.randomUUID(6)+".mid",s=new te.a.Track,u=[],c="";a={beatConst:["2","4"],noteConst:Object.assign([],e.noteConst),repeatControl:e.repeatControl,filesCount:1,speed:30};for(var p=0;p<r.beat.length;p++){var d=X(a.noteConst);a.repeatControl&&d===c&&a.noteConst.length>1&&(d=X(a.noteConst.filter((function(e){return e!=c})))),l.push({pitch:d,duration:r.beat[p].duration}),c=d}console.log(r),l.forEach((function(e){u.push(new te.a.NoteEvent({pitch:e.pitch,duration:"T"+4*e.duration}))})),s.setTempo(30).addEvent(u,(function(e,t){return{sequential:!0}}));var f=new te.a.Writer(s);e.tracks.push({beat:l,name:i,track:f.dataUri()}),o["default"].$localStorage.set("tracks",e.tracks)},l=0;l<a.filesCount;l++)r(l)},generateBeat:function(e,t){if(t.flagRecord){var n=t.beat,a=[],r="track_"+ne.randomUUID(6)+".mid",l=new te.a.Track,i=[];n.forEach((function(e){i.push(new te.a.NoteEvent({pitch:"C4",duration:"T"+4*e})),a.push({pitch:"C4",duration:e})})),l.setTempo(30).addEvent(i,(function(e,t){return{sequential:!0}}));var s=new te.a.Writer(l);e.tracks.push({beat:a,name:r,track:s.dataUri()})}else for(var u=function(n){t.noteConst=["C4"];var o=Y(t.beatConst,t.noteConst,t.repeatControl),a="track_"+ne.randomUUID(6)+".mid",r=new te.a.Track,l=[];o.forEach((function(e){l.push(new te.a.NoteEvent({pitch:e.pitch,duration:"T"+4*e.duration}))})),r.setTempo(30).addEvent(l,(function(e,t){return{sequential:!0}}));var i=new te.a.Writer(r);e.tracks.push({beat:o,name:a,track:i.dataUri()})},c=0;c<t.filesCount;c++)u(c);o["default"].$localStorage.set("tracks",e.tracks)}},actions:{},modules:{}}),ae=n("dccd"),re=n.n(ae);o["default"].config.productionTip=!1,o["default"].use(H.a,{locale:re.a}),o["default"].use(Q.a,{prefix:"your_app_slug_",drivers:["session","local"]}),new o["default"]({store:oe,render:function(e){return e(J)}}).$mount("#app")},"85ec":function(e,t,n){},de5f:function(e,t,n){},f81b:function(e,t,n){"use strict";var o=n("de5f"),a=n.n(o);a.a}});
//# sourceMappingURL=app.60b24825.js.map