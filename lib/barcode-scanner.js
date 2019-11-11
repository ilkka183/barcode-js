/*  

code_128_reader
ean_reader
ean_8_reader
code_39_reader
code_39_vin_reader
codabar_reader
upc_reader
upc_e_reader
i2of5_reader
2of5_reader
code_93_reader  

*/

class BarcodeScanner extends Scanner {
  constructor(reader) {
    super(reader);
    this.readers = ['code_128_reader'];
  }

  get isActive() {
    return this.active;
  }

  setActive(value) {
    this.active = value;
    this.reader.stateChanged();
  }

  start() {
    const config = {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          facingMode: "environment",
          aspectRatio: {min: 1, max: 2}
        },
        target: document.getElementById(this.reader.elementId)
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      decoder: {
        readers: this.readers
      }
    }

    Quagga.init(config, error => {
      if (error) {
        this.reader.errorRaised(error);
        return
      }

      Quagga.onDetected(data => {
        if (data.codeResult) {
          const scannedText = data.codeResult.code;

          this.reader.codeScanned(scannedText);
        }
      });

      Quagga.start();
      this.setActive(true);
    });
  }

  stop() {
    Quagga.stop();
    this.setActive(false);
  }
}
