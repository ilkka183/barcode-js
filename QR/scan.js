function onQRCodeScanned(scannedText)
{
  const scannedTextElement = document.getElementById("scannedText");

  if (scannedTextElement)
  {
    scannedTextElement.innerText = scannedText;
    console.log(scannedText);
  }
}

//funtion returning a promise with a video stream
function provideVideoQQ()
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

//this function will be called when JsQRScanner is ready to use
function JsQRScannerReady()
{
  //create a new scanner passing to it a callback function that will be invoked when
  //the scanner succesfully scan a QR code
  scanner = new JsQRScanner(onQRCodeScanned, provideVideoQQ);
  scanner.setSnapImageMaxSize(300);

  const scannerParentElement = document.getElementById("scanner");

  if (scannerParentElement)
  {
    //append the jbScanner to an existing DOM element
    scanner.appendTo(scannerParentElement);
  }        
}

let scanner = null;

// Stop/Resume button
const stopButton = document.getElementById('stop');

stopButton.addEventListener('click', () => {
  if (scanner) {
    if (scanner.isActive()) {
      stopButton.innerText = 'Resume';
      scanner.stopScanning();
    } else {
      stopButton.innerText = 'Stop';
      scanner.resumeScanning();    
    }
  }
});

