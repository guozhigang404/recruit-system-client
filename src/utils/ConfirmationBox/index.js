import getComponentRootDom from '@/utils/component-root-dom';
import IconFont from '@/components/IconFont'
import styles from "./index.module.less"

export default function (message = "", fun1, fun2) {


    let body = document.body;

    let wrap = document.createElement("div");
    wrap.classList.add(styles.wrap);
    let container = document.createElement("div");
    container.classList.add(styles.container)
    let oTitle = document.createElement("div");
    oTitle.classList.add(styles.header)
    oTitle.innerText = "请确认"
    container.appendChild(oTitle)
    let oContent = document.createElement("div");
    oContent.classList.add(styles.content)
    let msgBox = document.createElement("div")
    msgBox.classList.add(styles.msg_box)
    msgBox.innerText = message;

    let btnWrap = document.createElement("div");
    let btn1 = document.createElement("button");
    btn1.innerText = "确认";
    btn1.style.backgroundColor = "#F5365C"
    let btn2 = document.createElement("button");
    btn2.innerText = "取消";
    btn2.style.backgroundColor = "#99CCFF"

    btn1.onclick = function () {
        fun1 && fun1();
        wrap.remove();
    }

    btn2.onclick = function () {
        fun2 && fun2();
        wrap.remove();
    }


    btnWrap.classList.add(styles.btnWrap)
    btnWrap.appendChild(btn1);
    btnWrap.appendChild(btn2)
    oContent.appendChild(msgBox);
    oContent.appendChild(btnWrap)
    container.appendChild(oContent)

    wrap.appendChild(container)

    body.appendChild(wrap);
}
