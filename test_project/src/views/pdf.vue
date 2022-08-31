<template>
  <div><button @click="downLoad">下载</button></div>
</template>

<script>
import jsPDF from 'jspdf'
import defaultTagData from '../util/defaultTagData'
import {pxTomm,mmToPx,getDeviceXDPI} from '../util/common'
require('../util/pdf-font')
export default {
    data(){
        return{
            temp:null
        }
    },
    mounted(){
        this.temp = JSON.parse(defaultTagData)
        console.log(this.temp)
    },
    methods:{
        downLoad(){
            let DPI = getDeviceXDPI()
            let temp = this.temp
            let oLeft = temp.rectInfo.left;
            let oTop = temp.rectInfo.top;
            let lableH = mmToPx(temp.tag_height, DPI);
            let lableW = mmToPx(temp.tag_width, DPI);
            let tem_data = temp.tem_data;
            console.log(oLeft,oTop)
            

            let pdf = new jsPDF('l', 'pt',[lableW,lableH]);
            pdf.setFont('HanYiXiYuanJian-1');
            tem_data.forEach((item,index) => {
                let data = item.data
                if(item.type == 'FixedText'){
                    console.log(data.left - oLeft,data.top - oTop)
                    pdf.setFontSize(data.fontSize);
                    // pdf.setFontType('bold');
                    // pdf.setFontList([fontWeight])
                    pdf.text(data.left - oLeft,data.top - oTop,data.text);
                }
            })
            // pdf.addFont('SourceHanSans-Normal.ttf', 'SourceHanSans-Normal', 'normal');
            pdf.save()
        }
    }
}
</script>

<style>

</style>