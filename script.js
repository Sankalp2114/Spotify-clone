document.addEventListener('DOMContentLoaded', function() {

    const progressBar = document.getElementById('progress-bar');
    function updateEndTime() {
        const totalTime = audio.duration;
        const endMinutes = Math.floor(totalTime / 60);
        const endSeconds = Math.floor(totalTime % 60);
        const endFormattedTime = `${endMinutes}:${endSeconds < 10 ? '0' : ''}${endSeconds}`;
        endTime.textContent = endFormattedTime;
    }
    audio.addEventListener('loadedmetadata', function () {
        updateEndTime();
        updateStartTime();
    });
    function updateStartTime() {
        const currentTime = audio.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        startTimeSpan.textContent = formattedTime;
    }
    progressBar.addEventListener('input', function () {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        updateStartTime();
    });
      
    audio.addEventListener('timeupdate', function() {
        updateBarp();
        updateStartTime();
    });
    const startTimeSpan = document.getElementById('start-time');
    function updateBartime(input) {
        let audio = document.getElementById('song1');
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
let audio = document.getElementById('song1');
audio.volume = 0;

volume.addEventListener('input',function(e){
    audio.volume = e.currentTarget.value / 100;
    updateBar(volume);
});

let playButton = document.getElementById('pause-btn');
let song1 = document.getElementById('song1');
let play = false;

playButton.addEventListener('click', function() {
    if (play) {
        song1.pause();
        playButton.style.opacity = 0;

    } else {
        song1.play();
        playButton.style.opacity = 1;
    }
    play = !play;
    console.log(play);
});

function updateBarp(){
    const progressBar = document.getElementById('progress-bar');
    const value = (audio.currentTime / audio.duration) * 100;
    progressBar.value = value;
    progressBar.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
}




