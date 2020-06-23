export default {
    bind(el, binding, vnode) {
        if (binding.value == true) {
            el.style.backgroundColor = "aliceblue";
            el.style.color = "gray";
        } else {
            el.style.backgroundColor = "rgb(222, 243, 172)";
            el.style.color = "gray";
        }
    },
    unbind(el) {}
};
