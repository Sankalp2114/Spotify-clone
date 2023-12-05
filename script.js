document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.addEventListener('input', function() {
        updateBar(progressBar);
    });
    const volumeInput = document.getElementById('volume');
    volumeInput.addEventListener('input', function() {
        updateBar(volumeInput);
    });
});
function updateBar(inputElement) {
    const value = inputElement.value;
    inputElement.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
    inputElement.setAttribute('value', value);
}