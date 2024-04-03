let countdownTimer: NodeJS.Timeout;
let remainingTime: number = 0;
let isTimerRunning: boolean = false;
let selectedDuration: number = 5;

function startTimer(): void {
  console.log('Start button clicked');
  if (!isTimerRunning) {
    isTimerRunning = true;
    clearInterval(countdownTimer);
    remainingTime = remainingTime === 0 ? selectedDuration : remainingTime;
    updateTimeUI();
    countdownTimer = setInterval(updateTimer, 1000);
  }
}

function stopTimer(): void {
  console.log('Stop button clicked');
  clearInterval(countdownTimer);
  isTimerRunning = false;
}

function updateTimer(): void {
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

function updateTimeUI(): void {
  const timerDisplayElement: HTMLElement | null =
    document.getElementById('timerDisplay');
  if (timerDisplayElement) {
    timerDisplayElement.innerText = `Timer: ${remainingTime} seconds`;
  }
}

function saveTimerSession(duration: number): void {
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

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');

  function fetchSessionCount(): void {
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

  function updateSessionCountUI(sessionCount: number): void {
    const sessionCountElement: HTMLElement | null =
      document.getElementById('sessionCount');
    if (sessionCountElement) {
      sessionCountElement.textContent = `Sessions today: ${sessionCount}`;
    }
  }

  function fetchTotalDuration(): void {
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

  function updateTotalDurationUI(totalDuration: number): void {
    const totalDurationElement: HTMLElement | null =
      document.getElementById('totalDuration');
    if (totalDurationElement) {
      totalDurationElement.textContent = `Total duration today: ${totalDuration}`;
    }
  }

  function fetchAndUpdateData(): void {
    fetchSessionCount();
    fetchTotalDuration();
  }

  document.getElementById('startTimer')?.addEventListener('click', startTimer);
  document.getElementById('stopTimer')?.addEventListener('click', stopTimer);
  document
    .getElementById('durationSelect')
    ?.addEventListener('change', function () {
      selectedDuration = parseInt((this as HTMLInputElement).value);
      console.log('Selected duration:', selectedDuration);
    });

  fetchAndUpdateData();

  setInterval(fetchAndUpdateData, 5000);
});
