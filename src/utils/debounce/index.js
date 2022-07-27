export default function (fn, duration=100) {
    let timer = null;
    return (...params) => {
        clearTimeout(timer);
        timer = setTimeout(() =>{
            fn(...params);
        }, duration);
    }
}
