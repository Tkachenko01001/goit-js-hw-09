function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

const btn = document.querySelectorAll('button');
const bodyEl = document.querySelector('body');

let timer = null;

const onClickStart = () => {  
    btn[0].setAttribute("disabled", "disabled");
    btn[1].removeAttribute("disabled");
    
    bodyEl.style.backgroundColor = getRandomHexColor();

    timer = setTimeout(() => {
        onClickStart();
    }, 1000)
};

const onClickStop = () => {
    btn[0].removeAttribute("disabled");
    btn[1].setAttribute("disabled", "disabled");
    clearTimeout(timer);
};

btn[0].addEventListener('click', onClickStart);
btn[1].addEventListener('click', onClickStop);
