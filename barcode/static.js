function decodeImage() {
  barcode.type = typeSelect.value;
  barcode.size = sizeSelect.value;
  barcode.patchSize = patchSizeSelect.value;

  barcode.decodeSingle(image.src)
    .then(result => {
      console.log("result", result);
      setResult(result.codeResult);
    })
    .catch(() => {
      setResult(null);
    });
}

function setImage(src) {
  if (src) {
    image.style.visibility = 'visible';
    resultText.style.visibility ='visible';
  } else {
    image.style.visibility = 'hidden';
    resultText.style.visibility = 'hidden';
  }

  rerunButton.disabled = src == '';
  clearButton.disabled = src == '';

  image.src = src;
  decodeImage();
}

function setResult(value) {
  console.log(value);

  if (value)
    resultText.innerText = value.code + ' (' + value.format + ')';
  else
    resultText.innerText = 'Not detected';

  if (value && value.code) {
    resultText.classList.add('detected');
    resultText.classList.remove('not-detected');
  } else {
    resultText.classList.remove('detected');
    resultText.classList.add('not-detected');
  }
}

const barcode = new Barcode();
barcode.type = 'code_39_reader';

// File input
const fileInput = document.getElementById('file');

fileInput.addEventListener('change', event => {
  if (event.target.files[0]) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }
});

// Rerun button
const rerunButton = document.getElementById('rerun');
rerunButton.disabled = true;
rerunButton.addEventListener('click', () => decodeImage());

// Clear button
const clearButton = document.getElementById('clear');
clearButton.disabled = true;

clearButton.addEventListener('click', () => {
  fileInput.value = '';
  setImage('');
  setResult('');
});

const typeSelect = document.getElementById('type');
typeSelect.value = barcode.type;

const sizeSelect = document.getElementById('size');
sizeSelect.value = barcode.size;

const patchSizeSelect = document.getElementById('patchSize');
patchSizeSelect.value = barcode.patchSize;


// Image
const image = document.getElementById('image');
image.style.visibility  = 'hidden';

// Result
const resultText = document.getElementById('resultText');
