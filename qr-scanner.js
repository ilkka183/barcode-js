class QRScanner extends Scanner {
  constructor(elementId) {
    super(elementId);
  }

  get isActive() {
    return this.scanner && this.scanner.isActive();
  }

  startScanning() {
    if (!this.scanner) {
      // Create a new scanner passing to it a callback function that will be invoked when
      // the scanner succesfully scan a QR code
      this.scanner = new JsQRScanner(
        (scannedText) => {
          if (scannedText)
            this.codeScanned(scannedText);
        },
        this.provideVideoQQ);

      this.scanner.setSnapImageMaxSize(300);
    } else {
      this.scanner.resumeScanning();
    }

    const element = document.getElementById(this.elementId);

    if (element) {
      this.scanner.appendTo(element);
    }

    this.stateChanged();
  }

  stopScanning() {
    this.scanner.stopScanning();

    const element = document.getElementById(this.elementId);

    if (element) {
      this.scanner.removeFrom(element);
    }

    this.stateChanged();
  }

  //funtion returning a promise with a video stream
  provideVideoQQ()
  {
    return navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const ids = [];
  
        devices.forEach(device =>  {
          if (device.kind == 'videoinput') {
            ids.push(device.deviceId)
          }
        });
          
        return Promise.resolve(ids);
      })
      .then(ids => {
        if (ids.length == 0) {
          return Promise.reject('Could not find a webcam');
        }
  
        const sourceId = ids.length == 1 ? ids[0] : ids[1] // This way QQ browser opens the rear camera      
        
        return navigator.mediaDevices.getUserMedia({
          video: {
            optional: [{ sourceId }]
          }
        });        
      });                
  }  
}
