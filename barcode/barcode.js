class Barcode {
  constructor() {
    this.types = [this.defaultType];
    this.halfSample = true;
    this.locate = true;
    this.singleChannel = false;
    this.size = 800;
    this.patchSize = 'medium';
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
