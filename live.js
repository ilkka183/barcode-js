let live = false;

function setLive(value) {
  live = value;
  startButton.disabled = live;
  stopButton.disabled = !live;
}

const barcode = new Barcode();

// Start button
const startButton = document.getElementById('start');
startButton.disabled = live;
startButton.addEventListener('click', () => setLive(true));

// Stop button
const stopButton = document.getElementById('stop');
stopButton.disabled = !live;
stopButton.addEventListener('click', () => setLive(false));

const typeSelect = document.getElementById('type');
typeSelect.value = barcode.type;

const sizeSelect = document.getElementById('size');
sizeSelect.value = barcode.size;

const patchSizeSelect = document.getElementById('patchSize');
patchSizeSelect.value = barcode.patchSize;

