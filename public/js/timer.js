let countdownTimer;
let remainingTime = 0;
let isTimerRunning = false;
let selectedDuration = 5;

function startTimer() {
  console.log('Start button clicked');
  if (!isTimerRunning) {
    isTimerRunning = true;
    clearInterval(countdownTimer);
    console.log('Selected duration:', selectedDuration);
    remainingTime = remainingTime === 0 ? selectedDuration : remainingTime;
    updateTimeUI();
    document.getElementById('progress').style.width = '0';
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

    const progressPercentage =
      ((selectedDuration - remainingTime) / selectedDuration) * 100;

    document.getElementById('progress').style.width = progressPercentage + '%';
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
        selectedDuration = 5;
      } else {
        console.error('Failed to save timer session');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/* DOM manipulation */

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded');

  function fetchSessionCount() {
    fetch('/sessionCountToday')
      .then((response) => response.json())
      .then((data) => {
        console.log('Session count:', data.sessionCount);
        updateSessionCountUI(data.sessionCount);
      })
      .catch((error) => {
        console.error('Error fetching session count:', error);
      });
  }

  function updateSessionCountUI(sessionCount) {
    const sessionCountElement = document.getElementById('sessionCount');
    sessionCountElement.textContent = `Sessions today: ${sessionCount}`;
  }

  function fetchTotalDuration() {
    fetch('/totalDurationToday')
      .then((response) => response.json())
      .then((data) => {
        console.log('Total duration:', data.totalDuration);
        updateTotalDurationUI(data.totalDuration);
      })
      .catch((error) => {
        console.error('Error fetching total duration:', error);
      });
  }

  function updateTotalDurationUI(totalDuration) {
    const totalDurationElement = document.getElementById('totalDuration');
    totalDurationElement.textContent = `Total duration today: ${totalDuration}`;
  }

  function startCustomTimer() {
    const customDurationInput = document.getElementById('customDuration');
    const customDuration = parseInt(customDurationInput.value);
    if (!isNaN(customDuration) && customDuration > 0) {
      selectedDuration = customDuration;
      startTimer();
      // Reset the <select> element to its default value
      document.getElementById('durationSelect').selectedIndex = 0;
    } else {
      console.error('Invalid custom duration');
    }
  }

  document
    .getElementById('startCustomTimer')
    .addEventListener('click', startCustomTimer);

  function fetchAndUpdateData() {
    fetchSessionCount();
    fetchTotalDuration();
  }

  document.getElementById('startTimer').addEventListener('click', startTimer);
  document.getElementById('stopTimer').addEventListener('click', stopTimer);
  document
    .getElementById('durationSelect')
    .addEventListener('change', function () {
      selectedDuration = parseInt(this.value);
      console.log('Selected duration:', selectedDuration);
    });

  fetchAndUpdateData();

  setInterval(fetchAndUpdateData, 5000);
});
