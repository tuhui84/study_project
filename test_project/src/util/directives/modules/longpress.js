/**
创建一个计时器， 2 秒后执行函数
1.当用户按下按钮时触发 mousedown 事件，启动计时器；用户松开按钮时调用 mouseout 事件。
2.如果 mouseup 事件 2 秒内被触发，就清除计时器，当作一个普通的点击事件
3.如果计时器没有在 2 秒内清除，则判定为一次长按，可以执行关联的函数。
4.在移动端要考虑 touchstart，touchend 事件
 */
const longpress = {
  bind: (el, { value }) => {
    if (typeof value != "function") {
      throw "请传入一个function";
    }
    let pressTimer = null;
    const handler = value;
    const start = e => {
      if (e.type != "click" && e.button != 0) {
        return;
      }
      if (!pressTimer) {
        pressTimer = setTimeout(() => {
          handler();
        }, 2000);
      }
    };
    const cancel = e => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    // 添加计时器
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    // 删除计时器
    el.addEventListener("mouseout", cancel);
    el.addEventListener("click", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  unbind(el) {
    el.removeEventListener("click", el.handler);
  }
};
export default longpress;
