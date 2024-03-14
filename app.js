let timer;
let startTime;
let elapsedTime = 0;
let running = false;

function displayTime() {
  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

  document.getElementById('display').innerText = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
  if (running) {
    clearInterval(timer);
    running = false;
    document.getElementById('startStop').innerText = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      displayTime();
    }, 10);
    running = true;
    document.getElementById('startStop').innerText = 'Stop';
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  elapsedTime = 0;
  displayTime();
  document.getElementById('startStop').innerText = 'Start';
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  if (running) {
    let lapTime = elapsedTime;
    let lapItem = document.createElement('li');
    lapItem.innerText = `Lap ${document.getElementById('laps').children.length + 1}: ${displayTime()}`;
    document.getElementById('laps').appendChild(lapItem);
  }
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);
