export default function (fn, delay) {
  let timer = null;
  return function (...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}
