const startButton = document.getElementById('start');
startButton.addEventListener('click', () => scanner.startScanning());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => scanner.stopScanning());


let scanner = null;

function JsQRScannerReady()
{
  scanner = new QRScanner('scanner');
  scanner.onCodeScanned = codeScanned;
  scanner.onStateChanged = stateChanged;
}

function codeScanned(scannedText) {
  const element = document.getElementById('text');

  if (element)
    element.innerText = scannedText;
}

function stateChanged() {
  startButton.disabled = scanner.isActive;
  stopButton.disabled = !scanner.isActive;
}
