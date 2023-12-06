document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.addEventListener('input', function() {
        // const currentTime = updateBartime(progressBar);
        // updateBar(currentTime,progressBar);
        // updateBar(progressBar);
    });
    const startTimeSpan = document.getElementById('start-time');
    function updateBartime(input) {
        const totalTime = audio.duration; 
        const currentTime = (input.value / 100) * totalTime; 
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        startTimeSpan.textContent = formattedTime;
        audio.currentTime = (input.value / 100) * totalTime;
    }
    const totalTime = audio.duration;
    const endMinutes = Math.floor(totalTime / 60);
    const endSeconds = Math.floor(totalTime % 60);
    const endformattedTime = `${endMinutes}:${endSeconds < 10 ? '0' : ''}${endSeconds}`;
    const endTime = document.getElementById('end-time');
    endTime.textContent = endformattedTime;
    updateBartime(progressBar);
    progressBar.addEventListener('input', function () {
        updateBartime(progressBar);
    });
    const volumeInput = document.getElementById('volume');
    volumeInput.addEventListener('input', function() {
        updateBar(volumeInput);
    });
    audio.addEventListener('timeupdate', (event)=>{
        // const currentTime = (audio.currentTime / 100) * totalTime;
        // const value = currentTime.value;
        // console.log(value);
        // progressBar.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
        // updateBar2(audio.currentTime);
    });
});
function updateBar(inputElement) {
    const value = inputElement.value;
    inputElement.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
    inputElement.setAttribute('value', value);
}

function updateBar2(inputElement) {
    const value = inputElement;
    inputElement.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
    inputElement.setAttribute('value', value);
}
let volume = document.getElementById('volume');
let audio = document.getElementById('song1')
audio.volume = 0;
volume.addEventListener('input',function(e){
    audio.volume = e.currentTarget.value / 100;
});
let playButton = document.getElementById('play-btn');
let song1 = document.getElementById('song1');
let play = false;

playButton.addEventListener('click', function() {
    if (play) {
        song1.pause();
    } else {
        song1.play();
    }
    play = !play;
    console.log(play);
});


audio.ontimeupdate = (event) => {
    const progressBar = document.getElementById('progress-bar');
    const value = (audio.currentTime / audio.duration)*100;
    progressBar.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
    progressBar.setAttribute('value', value);
    console.log(value);
    
    
};
