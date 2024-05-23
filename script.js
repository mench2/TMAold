const knob = document.querySelector('.knob');
const slider = document.querySelector('.slider');
const rect = slider.getBoundingClientRect();
const centerX = rect.width / 2;
const centerY = rect.height / 2;
const radius = rect.width / 2 - 10; // Adjust radius based on knob size

let dragging = false;

function getAngle(x, y) {
    return Math.atan2(y - centerY, x - centerX);
}

function moveKnob(angle) {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    knob.style.left = `${x - knob.offsetWidth / 2}px`;
    knob.style.top = `${y - knob.offsetHeight / 2}px`;
}

function onMouseDown(event) {
    event.preventDefault();
    dragging = true;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = getAngle(x, y);
    moveKnob(angle);
}

function onMouseMove(event) {
    if (!dragging) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = getAngle(x, y);
    moveKnob(angle);
}

function onMouseUp() {
    dragging = false;
}

function onTouchStart(event) {
    event.preventDefault();
    dragging = true;
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const angle = getAngle(x, y);
    moveKnob(angle);
}

function onTouchMove(event) {
    if (!dragging) return;
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const angle = getAngle(x, y);
    moveKnob(angle);
}

function onTouchEnd() {
    dragging = false;
}

knob.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);

knob.addEventListener('touchstart', onTouchStart);
document.addEventListener('touchmove', onTouchMove);
document.addEventListener('touchend', onTouchEnd);
