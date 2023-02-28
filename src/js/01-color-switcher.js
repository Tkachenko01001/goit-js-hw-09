function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

const bodyEl = document.querySelector('body');

let timer = null;

const onClickStart = () => {  
    btnStart.setAttribute("disabled", "disabled");
    btnStop.removeAttribute("disabled");

    timer = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)
};

const onClickStop = () => {
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", "disabled");
    clearTimeout(timer);
};

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);
