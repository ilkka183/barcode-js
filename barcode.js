class Barcode {
  constructor() {
    this.halfSample = true;
    this.locate = true;
    this.singleChannel = false;
    this.size = 800;
    this.patchSize = 'x-large';
  }

  decodeSingle(src) {
    const config = {
      decoder: {
        readers: ["code_128_reader"]
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
  
    return new Promise((resolve, reject) => {
      Quagga.decodeSingle(config, result => {
        if (result.codeResult) {
          resolve(result);
        } else {
          reject('Not detected');
        }
      });
    });
  }
}
