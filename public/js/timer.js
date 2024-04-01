let countdownTimer;
let remainingTime = 0;
let isTimerRunning = false;
let selectedDuration = 5;

function startTimer() {
  console.log('Start button clicked');
  if (!isTimerRunning) {
    isTimerRunning = true;
    clearInterval(countdownTimer);
    remainingTime = remainingTime === 0 ? selectedDuration : remainingTime;
    updateTimeUI();
    countdownTimer = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  console.log('Stop button clicked');
  clearInterval(countdownTimer);
  isTimerRunning = false;
}

function updateTimer() {
  if (remainingTime > 0 && isTimerRunning) {
    remainingTime--;
    updateTimeUI();
  } else {
    stopTimer();
    if (remainingTime === 0) {
      saveTimerSession(selectedDuration);
    }
  }
}

function updateTimeUI() {
  document.getElementById(
    'timerDisplay'
  ).innerText = `Timer: ${remainingTime} seconds`;
}

function saveTimerSession(duration) {
  console.log('Saving timer session');
  console.log('Total duration:', duration);
  fetch(`/saveTimerSession?time=${duration}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Timer session saved successfully');
      } else {
        console.error('Failed to save timer session');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Add event listeners when DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded');
  document.getElementById('startTimer').addEventListener('click', startTimer);
  document.getElementById('stopTimer').addEventListener('click', stopTimer);
  document
    .getElementById('durationSelect')
    .addEventListener('change', function () {
      selectedDuration = parseInt(this.value);
      console.log('Selected duration:', selectedDuration);
    });
});
