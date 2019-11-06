const startButton = document.getElementById('start');
startButton.addEventListener('click', () => scanner.startScanning());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => scanner.stopScanning());


const scanner = new BarScanner('scanner');
scanner.onCodeScanned = codeScanned;
scanner.onError = error;
scanner.onStateChanged = stateChanged;

function codeScanned(scannedText) {
  const element = document.getElementById('text');

  if (element) {
    element.innerText = scannedText;
  }
}

function error(error) {
  const element = document.getElementById('text');

  if (element) {
    element.innerText = error;
  }
}

function stateChanged() {
  startButton.disabled = scanner.isActive;
  stopButton.disabled = !scanner.isActive;
}
