import flatpickr from "flatpickr";
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStart.disabled = true;

let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

     selectedDate = selectedDates[0].getTime();
     btnStart.disabled = false;

     if (selectedDate < options.defaultDate.getTime()) {

      btnStart.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future");
     }
    },
  };

flatpickr("#datetime-picker", options);

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    btnStart.disabled = true;
    this.intervalId = setInterval(() => {

    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const time = convertMs(deltaTime);
    this.onTick(time);
    
    if (daysEl.textContent === '00' && hoursEl.textContent === '00' && 
      minutesEl.textContent === '00' && secondsEl.textContent === '00') {
      clearInterval(this.intervalId);
      Notiflix.Notify.success('countdown is over :)');
    }
    
   }, 1000)
  }
}

const timer = new Timer({ 
  onTick: updateFace
});

function pad (value) {
  return String(value).padStart(2, '0');
}

function updateFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', timer.start);