<template>
    <div class="test" id="exportPdf" ref="exportPdf" style="width:200px;">
        <!-- <div>day</div>
        <button @click="exPDF">daochu</button>
        <input type="text" v-model="vaa">
        <button @click="test">开通</button>
        <svg ref="elSvg" id="elSvg"></svg> -->
        <!-- <canvas id="canvas"></canvas> -->
        <!-- <button @click="paste">粘贴</button> -->
        <svg id="svg" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
</template>

<script>
import JsBarcode from 'jsbarcode';
import canvg from "canvg";
export default {
    name:'test',
    data(){
        return{
            vaa:'',
            mycanvas: null,
            tests:{
                aa:{
                    b:1
                }
            },
            copyText:'',
            saveItem: null,
            currentItem: null,
            arr:[]
        }
    },
    mounted(){
        let can = document.getElementById('svg')
        // let can = document.createElement('canvas');
        // can.xmlns = 'http://www.w3.org/2000/svg'
        JsBarcode(can,6160479583801,{
            format: 'EAN13',
            width:1.0,
            height:90,
            margin:0,
        })
        console.log(can)
        let svgXml = new XMLSerializer().serializeToString(can)
        let canvas = document.createElement("canvas"); //页面创建空canvas
        canvg(canvas, svgXml)
        // console.log(canvas)
        console.log(canvas.toDataURL("image/png"))
        // console.log(svgXml)
        // let svghtml = can.innerHTML;
        // console.log(can)
        // let imgsrc = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svghtml)))}`;
        // console.log(imgsrc)
        // let url = can.toDataURL("image/png")
        // console.log(url)
        let that = this;
        document.addEventListener('keydown', function(e){
            if (e.keyCode == 67 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
                e.preventDefault();
                // console.log(that.currentItem)
                console.log(that.arr)
                that.mycanvas.loadFromJSON(that.arr[0])
                // if(that.currentItem){
                //     that.saveItem = fabric.util.object.clone(that.currentItem)
                //     // that.mycanvas.remove(that.currentItem)
                //     // console.log(that.arr)
                // }
            }
            if (e.keyCode == 86 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
                console.log(1111)
                e.preventDefault();
                that.mycanvas.loadFromJSON()
                // that.mycanvas.add(that.arr[0])
                // if(that.saveItem){
                //     let copy = fabric.util.object.clone(that.saveItem)
                //     copy.set({
                //         left:copy.left += 10,
                //         top: copy.top += 10
                //     })
                //     that.saveItem = copy
                //     that.mycanvas.add(that.saveItem)
                // }
            }
        });
        // let el = document.getElementById('elSvg')
        // JsBarcode(el, "Hi!")
        // console.log(el)
        // let canvas = document.createElement("canvas");
        // JsBarcode(canvas, 6160479583801, {
        //     format: "EAN13",
        //     width:1.0,
        //     height:40,
        //     margin:0,
        //     fontSize:14
        // });
        // let a = canvas.toDataURL("image/png",{
        //     quality:1,
        //     format: "jpeg", 
        // })
        // // console.log(a)
        // // 使用普通对象创建Map
        // let testMapObj = {
        //     name:'222'
        // }
        // let mapValue = Object.entries(testMapObj)
        // let map = new Map(Object.entries(testMapObj));
        // console.log(map.get('name'))
        // console.log(this.$refs.elSvg)
        // let svgXml = new XMLSerializer().serializeToString(el);//在svg标签上 用ref=elSvg
        // console.log(svgXml); //处理svg传给canvg的格式(这里会输出传给后端的字段)
        // let canvas = document.createElement("canvas"); //页面创建空canvas
        // canvg(canvas, svgXml); //进行转换
        // this.draw();
        // this.mycanvas.on({
        //      "mouse:down": (e) => {
        //         this.currentItem = e.target;
        //         console.log(this.currentItem)
        //      }
        // })
        // this.test()
    },
    computed:{
        
    },
    methods:{
        drawinlin(svgElement, ctx, callback){
            var svgURL = new XMLSerializer().serializeToString(svgElement);
            var img  = new Image();
            img.onload = function(){
                ctx.drawImage(this, 0,0);
                callback();
            }

            img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
        },
        test(){
            let fu = function() {
                return 1
            };
            let obj = new Object()
            let t = Object.prototype.isPrototypeOf(obj)
            // console.log(t)
            console.log(Function.prototype.isPrototypeOf(Object));
        },
        paste(){
            if(this.saveItem){
                this.saveItem.set({
                    left:this.saveItem.left + 10,
                    top: this.saveItem.top + 10
                })
                this.saveItem = fabric.util.object.clone(this.saveItem)
                this.mycanvas.add(this.saveItem)
            }
        },
        change(){
            this.tests.aa.b = 2
        },
        checkType(any) {
            return Object.prototype.toString.call(any).slice(8, -1)
        },
        clone(any){
            if(this.checkType(any) === 'Object') { // 拷贝对象
                let o = {};
                for(let key in any) {
                o[key] = this.clone(any[key])
                }
                return o;
            } else if(this.checkType(any) === 'Array') { // 拷贝数组
                var arr = []
                for(let i = 0,leng = any.length;i<leng;i++) {
                arr[i] = this.clone(any[i])
                }
                return arr;
            } else if(this.checkType(any) === 'Function') { // 拷贝函数
                return new Function('return '+any.toString()).call(this)
            } else if(this.checkType(any) === 'Date') { // 拷贝日期
                return new Date(any.valueOf())
            } else if(this.checkType(any) === 'RegExp') { // 拷贝正则
                return new RegExp(any)
            } else if(this.checkType(any) === 'Map') { // 拷贝Map 集合
                let m = new Map()
                any.forEach((v,k)=>{
                m.set(k, this.clone(v))
                })
                return m
            } else if(this.checkType(any) === 'Set') { // 拷贝Set 集合
                let s = new Set()
                for(let val of any.values()) {
                s.add(this.clone(val))
                }
                return s
            }
            return any;
        },
        // test(){
        //     var phoneReg = new RegExp("^[1][0-9]{10}$");
        //     console.log(phoneReg.test(this.vaa))
        // },
        draw(){
            let mycanvas = new fabric.Canvas("canvas",{
                width:1000,
                height:1000,
                selections: false
            });
            let groupW = 200;
            let groupH = 200;
            let rectW = 100;
            let rectH = 100;
            this.mycanvas = mycanvas
            let rect = new fabric.Rect({
                width: rectW,
                height: rectH,
                fill: 'red',
                left:100,
                top:100,
                selectable: false,
                cc:88
            })
            let Text = new fabric.Textbox("this is test text, lllllllll",{
                top: 300,
                left: 300,
                width: 50,
                aa: 90909,
                cc:888
            })
            // this.saveItem = fabric.util.object.clone(Text)
            // this.arr.push(Text)
            this.mycanvas.add(Text)
            // rect.set({
            //     left:100,
            //     top:100
            // })
            
            let group = new fabric.Group([rect],{
                top:50,
                left: 50,
                width: groupW,
                height: groupH,
                cc:99
            })
            group.item(0).set({
                left:-groupW/2 ,
                top:-groupH/2,
            })
            this.mycanvas.add(group)
            let copy = this.mycanvas.toJSON(['aa','cc'])
            this.arr.push(copy)
            // setTimeout(() => {
            //     this.mycanvas.remove(Text)
            // }, 5000)
        },
        exPDF(){
            // this.$PDFSave(this.$refs.exportPdf, "我的文件");
            // console.log()
            // this.getPdf('1111')
        }
    }
}
</script>

<style>
    .test{
        font-size: 20px;
        padding: 10px 0;
        /* background-color: red; */
        color: #fff;
        font-size: 40px;
    }
</style>