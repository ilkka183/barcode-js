class BarScanner extends Scanner {
  constructor(elementId) {
    super(elementId);

    this.types = [this.defaultType];
    this.halfSample = true;
    this.locate = true;
    this.singleChannel = false;
    this.size = 800;
    this.patchSize = 'medium';
    this.active = false;
  }

  get defaultType() {
    return 'code_128_reader';
  }

  get type() {
    for (let type of this.types)
      return type;

    return this.defaultType;
  }

  set type(value) {
    this.types = [value];
  }

  get readers() {
    const result = [];

    for (let type of this.types)
      result.push(type);

    if (result == [])
      result.push(this.defaultType);

    return result;
  }

  get isActive() {
    return this.active;
  }

  startScanning() {
    const config = {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        constraints: {
          width: 640,
          height: 480,
        },
        target: document.getElementById(this.elementId)
      },
      decoder: {
        readers: ['code_128_reader']
      }
    }

    console.log(config);
    console.log(this.elementId);
    console.log('start');
    console.log(Quagga);

    Quagga.init(config, error => {
      if (error) {
        console.log(error);
        this.error(error);
        return
      }

      console.log('Initialization finished. Ready to start');
      
      Quagga.onDetected(data => {
        if (data.codeResult) {
          const scannedText = data.codeResult.code;
          console.log(scannedText);
          this.codeScanned(scannedText);
        }
      });

      Quagga.start();
      this.action = true;
    });
  }

  stopScanning() {
    console.log('Scanning stopped');
    Quagga.stop();
    this.action = false;
  }

  decodeSingle(src) {
    const config = {
      decoder: {
        readers: this.readers
      },
      inputChannel: {
        singleChannel: this.singleChannel,
        size: this.size
      },
      locate: this.locate,
      locator: {
        halfSample: this.halfSample,
        patchSize: this.patchSize
      },
      src
    }

    console.log(config);
  
    return new Promise((resolve, reject) => {
      Quagga.decodeSingle(config, result => {
        if (result) {
          resolve(result);
        } else {
          reject('Not detected');
        }
      });
    });
  }
}
