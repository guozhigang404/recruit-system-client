import getComponentRootDom from '@/utils/component-root-dom';
import IconFont from '@/components/IconFont'
import styles from "./message.module.less"
/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 内容的类型 info | success | warn | error
 * @param {Number} duration 弹框保留的时间，单位毫秒，默认值 2000
 * @param {HTMLElement} container 弹出框的容器
 * @param {Function} callback 弹出框消失的时候执行的回调
 */
export default function (content, type, duration = 2000, container, callback) {
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(IconFont, {
        iconType: type
    });
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    if (!container) {
        container = document.body;
    } else {
        if(getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }
    const bgClassName = styles[`message-${type}`];
    div.classList.add(bgClassName)
    div.classList.add(styles.message)
    container.appendChild(div);
    div.clientHeight;
    div.style.opacity = "1";
    div.style.transform = `translate(-50%, -50%)`;

    setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = `translate(-50%, -50%) translateY(-30px)`;
        div.addEventListener("transitionend", function() {
            div.remove();
            callback && callback();
        })
    }, duration)
}
