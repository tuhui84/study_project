<template>
  <div id="app">
    <div id="wrap">
      <div class="goodMenu" ref="goodMenu">
        <ul>
          <li
            v-for="(item ,index) in goodMenu"
            :key="index"
            :class="{active: currentIndex === index}"
            @click="selectLeft(index)"
            ref="lItem"
          >{{ item}}</li>
        </ul>
      </div>

      <div class="goodList" id="goodList" ref="goodList" @scroll="changeScroll($event)">
        <ul>
          <li v-for="(items, index) in goodList" :key="index" ref="rItem">
            <p>{{ items.name}}</p>

            <div v-for="(item, key) in items.data" :key="key">{{ item}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  data() {
    return {
      number: 30,
      goodMenu: [
        "菜单1",
        "菜单2",
        "菜单3",
        "菜单4",
        "菜单5",
        "菜单6",
        "菜单7",
        "菜单8"
      ],
      goodList: [
        { name: "菜单1", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "菜单2", data: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"] },
        { name: "菜单3", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "菜单4", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        {
          name: "菜单5",
          data: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8"]
        },
        { name: "菜单6", data: ["1.1", "1.2", "1.3", "1.4", "1.5"] },
        { name: "菜单7", data: ["1.1", "1.2", "1.3", "1.4","1.1", "1.2"] },
        { name: "菜单8", data: ["1.1", "1.2","1.1", "1.2","1.1", "1.2"] }
      ],
      scrollY: 0, //获取实时滚动位置
      heightList: [] //获取每一个li的高度
    };
  },
  computed: {
    currentIndex() {
      const index = this.heightList.findIndex((item, index) => {
        return (
          this.scrollY >= this.heightList[index] &&
          this.scrollY < this.heightList[index + 1]
        );
      });
        console.log(index)
      return index > 0 ? index : 0;
    }
  },
  methods: {
    changeScroll(e){
        this.scrollY = e.target.scrollTop
    },
    selectLeft(index) {
      //点击左边菜单栏，立马高亮，不会等到右侧滚动结束后，左侧菜单栏才开始高亮（优化）
      this.scrollY = this.heightList[index];

      //点击了左侧菜单，获取相应右侧列表的元素，并使用Bscroll提供的scrollToElement()  Api跳转
      let rItem = this.$refs.rItem;
      let el = rItem[index];
        document.getElementById('goodList').scrollTop = this.scrollY
    //   this.goodmenu.scrollToElement(el, 1000);
    },
    //获取右侧列表每一个li的高度，存入数组中
    getHeight() {
      //获取每一个li的高度
      const lis = this.$refs.rItem;
      //heightList的第一个元素为0
      let height = 0;
      this.heightList.push(height);
      //之后的高度即为当前li的高度加上之前面li的高度和
      lis.forEach(item => {
        //clientHeight = content + padding
        height += item.clientHeight;
        this.heightList.push(height);
      });
      console.log(this.heightList)
    }
  },
  created() {
    this.$nextTick(() => {
      this.getHeight();
    });
  }
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
#wrap {
  display: flex;
  height: 600px;
  background-color: skyblue;
}
.active {
  background-color: red;
}
.goodMenu {
  line-height: 60px;
  background-color: pink;
}
.goodList{
  overflow-y: scroll;
}
.goodList > ul {
  width: 300px;
  text-align: center;
  list-style: none;
}
.goodList > ul >li >p {
    height: 40px;
    line-height: 40px;
}
</style>