import './style.css'

document.querySelector('#app').innerHTML = `
    <div>
        <input type="number" id="time-input" placeholder="Введите время в секундах">
        <button id="add-timer">Добавить таймер</button>
    </div>
    <ul id="timers">
        <!-- Таймеры будут добавляться сюда -->
    </ul>
`;

const startTimer = (timeValue, timerText, removeTimer) => {
  let timer = timeValue;
  const intervalId = setInterval(() => {
    timerText.textContent = `Таймер: ${timer} секунд`;
      
      if (timer > 0) {
        timer--;
      } else {
        clearInterval(intervalId);
        removeTimer();
      }
  }, 1000);

  return () => {
    clearInterval(intervalId);
    removeTimer();
  };
};

document.querySelector('#add-timer').addEventListener('click', () => {
  const timeInput = document.querySelector('#time-input');
  const timeValue = parseInt(timeInput.value.trim(), 10);

  if (timeValue > 0) {
    const timersList = document.querySelector('#timers');

    const timerItem = document.createElement('li');
    const timerText = document.createElement('span');
    const removeButton = document.createElement('button');
    
    timerText.textContent = `Таймер: ${timeValue} секунд`;
    removeButton.textContent = 'Удалить';

    timerItem.appendChild(timerText);
    timerItem.appendChild(removeButton);
    timersList.appendChild(timerItem);

    const removeTimer = () => {
      timerItem.remove();
    };

    const stopTimer = startTimer(timeValue, timerText, removeTimer);

    removeButton.addEventListener('click', () => {
      stopTimer();
    });

    timeInput.value = '';
  } else {
    alert('Введите время работы таймера');
  }
});
