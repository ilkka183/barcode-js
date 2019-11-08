const reader = new CodeReader('scanner');
reader.barcodeScanner.readers = ['code_128_reader', 'ean_reader', 'ean_8_reader'];
reader.onCodeScanned = codeScanned;
reader.onErrorRaised = errorRaised;
reader.onStateChanged = stateChanged;


const startQRButton = document.getElementById('startQR');

startQRButton.addEventListener('click', () => {
  reader.scannerType = 'qr';
  reader.startScanning();
  setText('');
});

const startBarcodeButton = document.getElementById('startBarcode');

startBarcodeButton.addEventListener('click', () => {
  reader.scannerType = 'barcode';
  reader.startScanning();
  setText('');
});

const stopButton = document.getElementById('stop');

stopButton.addEventListener('click', () => {
  reader.stopScanning();
});


function JsQRScannerReady()
{
  reader.qrScanner.ready = true;
}

function setText(text) {
  const element = document.getElementById('text');

  if (element)
    element.innerText = text;
}

function codeScanned(scannedText) {
  setText(scannedText);
  reader.stopScanning();
}

function errorRaised(errorText) {
  setText(errorText);
}

function stateChanged() {
  startQRButton.disabled = reader.isActive;
  startBarcodeButton.disabled = reader.isActive;
  stopButton.disabled = !reader.isActive;
}
