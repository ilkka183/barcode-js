class Scanner {
  constructor(reader) {
    this.reader = reader;
  }

  get isActive() {
    return false;
  }

  start() {
  }

  stop() {
  }
}


class CodeReader {
  constructor(elementId) {
    this.elementId = elementId;
    this._scannerType = 'qr';
    this.barcodeScanner = new BarcodeScanner(this);
    this.qrScanner = new QRScanner(this);
    this._onCodeScanned = null;
    this._onErrorRaised = null;
    this._onStateChanged = null;
  }

  get activeScanner() {
    switch (this._scannerType) {
      case 'qr': return this.qrScanner;
      case 'barcode': return this.barcodeScanner;
    }

    return null;
  }

  get scannerType() {
    return this._scannerType;
  }

  set scannerType(value) {
    if (value == 'qr')
      this._scannerType = 'qr';
    else if (value == 'barcode')
      this._scannerType = 'barcode';
  }

  get isActive() {
    return this.activeScanner.isActive;
  }

  startScanning() {
    this.activeScanner.start();
  }

  stopScanning() {
    this.activeScanner.stop();
  }

  set onCodeScanned(value) {
    this._onCodeScanned = value;
  }

  set onErrorRaised(value) {
    this._onErrorRaised = value;
  }

  set onStateChanged(value) {
    this._onStateChanged = value;
  }

  codeScanned(scannedText) {
    console.log('Code scanned: ' + scannedText);

    if (this._onCodeScanned)
      this._onCodeScanned(scannedText);
  }

  errorRaised(error) {
    console.log('Error raised: ' + error);

    if (this._onErrorRaised)
      this._onErrorRaised(error);
  }

  stateChanged() {
    console.log('Active = ' + this.isActive);

    if (this._onStateChanged)
      this._onStateChanged();
  }
}
