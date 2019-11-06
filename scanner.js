class Scanner {
  constructor(elementId) {
    this.elementId = elementId;
    this._onCodeScanned = null;
    this._onError = null;
    this._onStateChanged = null;
  }

  set onCodeScanned(value) {
    this._onCodeScanned = value;
  }

  set onError(value) {
    this._onError = value;
  }

  set onStateChanged(value) {
    this._onStateChanged = value;
    this.stateChanged();
  }

  codeScanned(scannedText) {
    if (this._onCodeScanned)
      this._onCodeScanned(scannedText);
  }

  error(error) {
    if (this._onError)
      this._onError(error);
  }

  stateChanged() {
    if (this._onStateChanged)
      this._onStateChanged();
  }

  get isActive() {
    return false;
  }

  startScanning() {
  }

  stopScanning() {
  }
}
