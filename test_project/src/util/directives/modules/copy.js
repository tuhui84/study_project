const copy = {
  bind(el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.readOnly = "readonly";
      textarea.style.position = "absolute";
      textarea.style.left = "-999999px";
      textarea.value = el.$value;
      document.body.appendChild(textarea);
      textarea.select();
      // execCommand方法即将被放弃
      // const copyValue = document.execCommand("Copy");
      // 新方法
      navigator.clipboard.writeText(el.$value).then(() => {});
      document.body.removeChild(textarea);
    };
    el.addEventListener("click", el.handler);
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener("click", el.handler);
  }
};
export default copy;
