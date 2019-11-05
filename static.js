function decodeImage() {
  barcode.decodeSingle(image.src)
    .then(result => {
      console.log("result", result);
      setResult(result.codeResult.code);
    })
    .catch(() => {
      setResult('');
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

function setResult(code) {
  console.log(code);

  if (code)
    resultText.innerText = code;
  else
    resultText.innerText = 'Not detected';

  if (code) {
    resultText.classList.add('detected');
    resultText.classList.remove('not-detected');
  } else {
    resultText.classList.remove('detected');
    resultText.classList.add('not-detected');
  }
}

const barcode = new Barcode();

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

// Image
const image = document.getElementById('image');
image.style.visibility  = 'hidden';

// Result
const resultText = document.getElementById('resultText');
