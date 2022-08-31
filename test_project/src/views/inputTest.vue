<template>
  <div>
    <div
      class="textarea"
      v-waterMarker="{
        text: '小zzzz',
        textColor: 'rgba(180, 180, 180, 0.4)'
      }"
    >
      <!-- <span class="test" @dragstart.stop="startDrag($event)" draggable="true">wwerwrerer</span> -->
      <!-- <textarea  @drop='dropOver' v-model="value" name="" id="area" cols="30" rows="10" @change="change"></textarea> -->
      <!-- <canvas id="cc" width="500" height="500"></canvas> -->
      <!-- <canvas id="ttest"></canvas> -->
      <!-- <input  type="file" @change="changeFile" multiple="multiple"> -->
      <!-- <input type="file" @change="getFile($event)" accept="video/*" />
      <div class="content">
        <div class="item1 item" :class="['item1', 'item', getAni(1)]">
          <img src="../assets/1.png" alt="" />
        </div>
        <div class="item2 item">
          <img src="../assets/2.png" alt="" />
        </div>
        <div class="item3 item">
          <img src="../assets/3.png" alt="" />
        </div>
      </div>-->
      <div id="container"></div>
      <button v-copy="copyText">复制</button>
      <div v-longpress="longpressFun">长按两秒</div>
      <button v-debounce="debounceFun">提交防抖</button>
      <div v-permission="'9'">权限</div>
    </div>
  </div>
</template>
<style lang="less">
.content {
  width: 800px;
  height: 500px;
  border: 1px solid #000;
  position: relative;
  margin: 0 auto;
  @keyframes i1 {
    to {
      top: 80px;
      left: 100px;
    }
  }
  @keyframes i2 {
    to {
      top: 120px;
      left: 150px;
    }
  }
  @keyframes i3 {
    to {
      top: 80px;
      left: 200px;
    }
  }
  .item {
    &.a_i1 {
      animation: i1 1s;
    }
    &.a_i2 {
      animation: i2 1s;
    }
    &.a_i3 {
      animation: i3 1s;
    }
    position: absolute;
    &.item1 {
      top: 80px;
      left: 100px;
    }
    &.item2 {
      top: 120px;
      left: 150px;
    }
    &.item3 {
      top: 80px;
      left: 200px;
    }
  }
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      // value:'',
      aa: {
        name: "222",
        num: 2323,
        test: "dgdfg"
      },
      copyText: "a copy directives",
      file: "",
      canvas: null,
      value: undefined,
      typeData: [],
      index: 0,
      markerUrl: require("../assets/logo.png"), // 点标记图片路径
      map: "",
      zoom: 15, // 地图一开始的缩放级别
      center: new window.TMap.LatLng(39.98412, 116.307484), // 地图一开始的中心点
      markerLayer: ""
    };
  },
  computed: {
    getAni() {
      return val => {
        let req = "i1";
        switch (val) {
          case 1:
            req = "i1";
            break;
        }
      };
    }
  },
  watch: {
    index(val) {}
  },
  mounted() {
    // let a = "123kk5.aa";
    // let houzui = "";
    // if (a.indexOf(".") != -1) {
    //   houzui = a.substr(0, a.lastIndexOf("."));
    // } else {
    //   houzui = a;
    // }
    // console.log(houzui);
    // var c=document.getElementById("cc");
    // var ctx=c.getContext("2d");
    // ctx.font='normal  5px "Times New Roman"';
    // ctx.fillText("Hello World!",10,50);
    // console.log(ctx)
    // let form = new FormData()
    // console.log(form)
    // console.log(this.todayDate())
    // console.log(this.randomString(10))
    // console.log(Math.random())
    // axios({
    //     url:'https://guicloud.thinkerx.com/guigui/cloudStorage/getSupplierList',
    //     data:{
    //         status:1
    //     },
    //     method:'post',
    //     // 上传进度
    //     // onUploadProgress
    //     // 下载进度
    //     onDownloadProgress(progress){
    //         console.log(Math.round(progress.loaded / progress.total * 100) + '%');
    //     }
    // })
    // this.drawCa()
    this.initMap(this.center, this.zoom);
  },
  methods: {
    debounceFun(time = 1000) {
      console.log("debounce submit");
    },
    longpressFun() {
      console.log("I AM IS LONGPRESS");
    },
    initMap(center, zoom) {
      this.map = new window.TMap.Map(document.getElementById("container"), {
        center: center, //设置地图中心点坐标
        zoom: zoom, //设置地图缩放级别
        pitch: 0, //设置俯仰角
        rotation: 0 //设置地图旋转角度
      });

      this.markerLayer = new window.TMap.MultiMarker({
        // 创建标记层
        map: this.map, //指定地图容器
        geometries: [
          {
            id: "demo", //指定点标记id
            position: new TMap.LatLng(39.9821, 116.3131, 134), // 标记位置(经度，纬度，高度)
            styleId: "mystyle"
          },
          {
            id: "demo1", //指定点标记id
            position: new TMap.LatLng(39.9721, 116.3131, 134) // 标记位置(经度，纬度，高度)
          }
        ],
        styles: {
          // 点标记样式
          mystyle: new window.TMap.MarkerStyle({
            width: 50,
            height: 50,
            src:
              "https://eggrj.oss-cn-hangzhou.aliyuncs.com/chart_log/1633747052266.png",
            anchor: { x: 10, y: 10 },
            opacity: 1
          })
        }
      });
    },
    getFile(e) {
      console.log(e);
    },
    handleSearch(value) {
      this.handleChange(value);
    },
    /**
     * @function 任务类型改变时的回调
     * @author ***
     * @time 2020-08-17
     **/
    handleChange(value) {
      console.log(value);
      this.value =
        !isNaN(value) && value != "" ? this.typeData[value].work_type : value;
    },
    /**
     * @function 任务类型失焦事件
     * @author ***
     * @time 2020-08-17
     **/
    handleBlur(value) {
      this.value = value;
      //  this.model.workType = this.value;
    },
    changeFile(e) {
      // throw new Error('type of data error')
      let file = e.target.files;
      console.log(file.length);
      for (let i of file) {
        console.log(i);
      }
    },
    drawCa() {
      let mycanvas = new fabric.Canvas("ttest", {
        width: 500,
        height: 500,
        selections: false
      });
      this.canvas = mycanvas;
      fabric.RectWithText = fabric.util.createClass(fabric.Rect, {
        type: "rectWithText",
        text: null,
        textOffsetLeft: 0,
        textOffsetTop: 0,
        _prevObjectStacking: null,
        _prevAngle: 0,

        recalcTextPosition: function() {
          const sin = Math.sin(fabric.util.degreesToRadians(this.angle));
          const cos = Math.cos(fabric.util.degreesToRadians(this.angle));
          const newTop = sin * this.textOffsetLeft + cos * this.textOffsetTop;
          const newLeft = cos * this.textOffsetLeft - sin * this.textOffsetTop;
          const rectLeftTop = this.getPointByOrigin("left", "top");
          this.text.set("left", rectLeftTop.x + newLeft);
          this.text.set("top", rectLeftTop.y + newTop);
        },

        initialize: function(rectOptions, textOptions, text) {
          this.callSuper("initialize", rectOptions);
          this.text = new fabric.Textbox(text, {
            ...textOptions,
            selectable: false,
            evented: false,
            textAlign: "center"
          });
          this.textOffsetLeft = this.text.left - this.left;
          this.textOffsetTop = this.text.top - this.top;
          this.on("moving", () => {
            this.recalcTextPosition();
          });
          this.on("rotating", () => {
            this.text.rotate(this.text.angle + this.angle - this._prevAngle);
            this.recalcTextPosition();
            this._prevAngle = this.angle;
          });
          this.on("scaling", e => {
            this.recalcTextPosition();
          });
          this.on("added", () => {
            this.canvas.add(this.text);
          });
          this.on("removed", () => {
            this.canvas.remove(this.text);
          });
          this.on("mousedown:before", () => {
            this._prevObjectStacking = this.canvas.preserveObjectStacking;
            this.canvas.preserveObjectStacking = true;
          });
          this.on("mousedblclick", () => {
            this.text.selectable = true;
            this.text.evented = true;
            this.canvas.setActiveObject(this.text);
            this.text.enterEditing();
            this.selectable = false;
          });
          this.on("deselected", () => {
            this.canvas.preserveObjectStacking = this._prevObjectStacking;
          });
          this.text.on("editing:exited", () => {
            this.text.selectable = false;
            this.text.evented = false;
            this.selectable = true;
          });
        }
      });

      const rectOptions = {
        left: 10,
        top: 10,
        width: 200,
        height: 75,
        fill: "#dedede"
      };
      const textOptions = {
        left: 10,
        top: 10,
        width: 150,
        // shadow: new fabric.Shadow({
        //     color: 'rgba(34, 34, 100, 0.4)',
        //     blur: 2,
        //     offsetX: -2,
        //     offsetY: 2
        // }),
        fontSize: 10
      };
      const rectWithText = new fabric.RectWithText(
        rectOptions,
        textOptions,
        "Some text"
      );
      let tText = new fabric.Textbox("2123", {
        left: 200,
        top: 200,
        width: 100,
        lockScalingY: true,
        lockRotation: true,
        lockScalingFlip: true,
        splitByGrapheme: false,
        objectCaching: false,
        textAlign: "right"
      });
      tText.on("scaling", ev => {
        let target = ev.transform.target;
        let width = target.get("width") * target.get("scaleX");
        target.set("width", width);
        target.set("scaleX", 1);
        let height = target.get("height") * target.get("scaleY");
        target.set("height", height);
        target.set("scaleY", 1);
      });
      this.canvas.add(tText);
      rectWithText["setControlVisible"]("mtr", false);
      console.log(rectWithText);
      this.canvas.add(rectWithText);
    },
    randomString(len) {
      len = len || 32;
      var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = $chars.length;
      var pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    todayDate() {
      var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "_";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        "";
      +"";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return M + D;
    },
    startDrag(event) {
      this.$nextTick(() => {
        console.log(event);
        event.dataTransfer.setData("Text", `{${event.target.innerHTML}}`);
      });
    },
    dropOver(event) {
      // this.$nextTick(() => {
      //     event.preventDefault();
      //     var data = event.dataTransfer.getData("Text");
      //     console.log(data)
      //     let s = document.querySelector(`.test`).cloneNode(true);
      //     console.log(s)
      //     event.target.appendChild(s);
      // });
    },
    change() {
      console.log(this.value);
      let d = document.getElementById("area");
      this.makeExpandingArea(d);
    },
    makeExpandingArea(el) {
      var timer = null;
      //由于ie8有溢出堆栈问题，故调整了这里
      var setStyle = function(el, auto) {
        if (auto) el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      };
      var delayedResize = function(el) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timer = setTimeout(function() {
          setStyle(el);
        }, 200);
      };
      if (el.addEventListener) {
        el.addEventListener(
          "input",
          function() {
            setStyle(el, 1);
          },
          false
        );
        setStyle(el);
      } else if (el.attachEvent) {
        el.attachEvent("onpropertychange", function() {
          setStyle(el);
        });
        setStyle(el);
      }
      if (window.VBArray && window.addEventListener) {
        //IE9
        el.attachEvent("onkeydown", function() {
          var key = window.event.keyCode;
          if (key == 8 || key == 46) delayedResize(el);
        });
        el.attachEvent("oncut", function() {
          delayedResize(el);
        }); //处理粘贴
      }
    }
  }
};
</script>

<style>
.textarea {
  /* width: 300px;
        height: 300px;
        margin: 30px auto; */
  width: 100vw;
  height: 100vh;
}
textarea {
  outline: none;
  height: auto;
  resize: none;
}
</style>
