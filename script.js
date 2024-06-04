const knob = document.querySelector('.knob');
const slider = document.querySelector('.slider');
const valueDisplay = document.querySelector('.value-display');

const rect = slider.getBoundingClientRect();
const centerX = rect.width / 2;
const centerY = rect.height / 2;
const radius = rect.width / 2 - 10; // Adjust radius based on knob size

let dragging = false;
let startAngle = 0;
let currentAngle = 0;
let rotationCount = 0;
let lastAngle = 0;

// Horizontal slider variables
const horizontalSlider = document.querySelector('.horizontal-slider');
const horizontalKnob = document.querySelector('.horizontal-knob');
const horizontalRect = horizontalSlider.getBoundingClientRect();
const sliderWidth = horizontalRect.width;
let horizontalDragging = false;

function getAngle(x, y) {
    return Math.atan2(y - centerY, x - centerX);
}

function moveKnob(angle) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    knob.style.left = `${x - 10}px`; // Adjust for knob size
    knob.style.top = `${y - 10}px`; // Adjust for knob size
}

function onPointerDown(event) {
    event.preventDefault();
    dragging = true;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    startAngle = getAngle(x, y) - currentAngle;
    lastAngle = currentAngle;
}

function onPointerMove(event) {
    if (!dragging) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = getAngle(x, y);
    currentAngle = angle - startAngle;
    moveKnob(currentAngle);

    // Update the rotation count based on the current angle
    updateRotationCount(currentAngle);
}

function onPointerUp() {
    dragging = false;
}

function updateRotationCount(angle) {
    const degrees = angle * (180 / Math.PI);
    const normalizedDegrees = (degrees + 360) % 360;
    const lastDegrees = lastAngle * (180 / Math.PI) + 360 % 360;

    if (lastDegrees > 270 && normalizedDegrees < 90) {
        rotationCount++;
    } else if (lastDegrees < 90 && normalizedDegrees > 270) {
        rotationCount--;
    }

    valueDisplay.textContent = rotationCount;
    lastAngle = angle;
}

// Horizontal slider functions
function onHorizontalPointerDown(event) {
    event.preventDefault();
    horizontalDragging = true;
}

function onHorizontalPointerMove(event) {
    if (!horizontalDragging) return;
    const x = event.clientX - horizontalRect.left;
    let position = Math.min(Math.max(0, x), sliderWidth);
    horizontalKnob.style.left = `${position}px`;
}

function onHorizontalPointerUp() {
    horizontalDragging = false;
    horizontalKnob.style.left = '0';
}

knob.addEventListener('pointerdown', onPointerDown);
document.addEventListener('pointermove', onPointerMove);
document.addEventListener('pointerup', onPointerUp);

// For touch devices
document.addEventListener('pointercancel', onPointerUp);

// Horizontal slider event listeners
horizontalKnob.addEventListener('pointerdown', onHorizontalPointerDown);
document.addEventListener('pointermove', onHorizontalPointerMove);
document.addEventListener('pointerup', onHorizontalPointerUp);

// For touch devices
document.addEventListener('pointercancel', onHorizontalPointerUp);
