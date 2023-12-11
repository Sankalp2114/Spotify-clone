let songIndex = 0;
let defaultAudio = new Audio('assets/Mahiye Jinna Sohna (Lyrics) - Darshan Raval.mp3');
let songItem = Array.from(document.getElementsByClassName('card-layout'));
let progressBar = document.getElementById('progress-bar')
let songs = [
        {songName:"Mahiye Jinna Sona - Darshan Raval",artistName:"Darshan Raval",location:"assets/Mahiye Jinna Sohna (Lyrics) - Darshan Raval.mp3",cover:"assets/mahiye-jinna-sona.jpg"},
        {songName:"Stay with me - 1Nonly",artistName:"1Nonly",location:"assets/Stay With Me.mp3",cover:"assets/1nonly.jpg"},
        {songName:"Strangers - Kenya Grace",artistName:"Kenya Grace",location:"assets/Strangers.mp3",cover:"assets/Strangers.jpg"},
        {songName:"Stressed Out - TwentyOne Pilots",artistName:"TwentyOne Pilots",location:"assets/Stressed-Out.mp3",cover:"assets/Stressed_Out.jpg"},
        {songName:"Sunflower - Post Malone,Sawe Lee",artistName:"Post Malone,Swae Lee",location:"assets/Sunflower (Spider-Man_ Into the Spider-Verse).mp3",cover:"assets/sunflower.jpg"},
        {songName:"Counting Stars - OneRepublic",artistName:"OneRepublic",location:"assets/Counting Stars.mp3",cover:"assets/countingStars.jpg"},
        {songName:"Self Talk - Parker Jack",artistName:"Parker Jack",location:"assets/Self Talk.mp3",cover:"assets/self-talk.jpg"},
        {songName:"JOKER - DAX",artistName:"DAX",location:"assets/JOKER.mp3",cover:"assets/joker.jpg"},
        {songName:"Asal Mein - Darshan Raval",artistName:"Darshan Raval",location:"assets/Asal Mein.mp3",cover:"assets/Asal-Mein.jpg"},
        {songName:"Something Just Like This - Coldplay",artistName:"Coldplay",location:"assets/somethingjustlikethis.mp3",cover:"assets/something.jpg"}
    ];

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].cover;
    element.getElementsByClassName("title")[0].innerText = songs[i].songName;
    // element.getElementById('bottom-cover').src=songs.cover;
});

document.addEventListener('DOMContentLoaded', function() {
    let volume = document.getElementById('volume');
    let audio = document.getElementById('song');
    audio.volume = 0.1;

    volume.addEventListener('input', function(e) {
        audio.volume = e.currentTarget.value / 100;
        updateVolumeBar(volume);
    });
    function updateVolumeBar(inputElement) {
        const value = inputElement.value;
        inputElement.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
        inputElement.setAttribute('value', value);
    }

    let playButton = document.getElementById('pause-btn');
    let play = false;

    playButton.addEventListener('click', function() {
        if (play) {
            audio.pause();
            playButton.style.opacity = 0;
        } else {
            audio.play();
            playButton.style.opacity = 1;
        }
        play = !play;
        console.log(play);
    });
    
    songItem.forEach((element, index) => {
        element.addEventListener('click', function() {
            changeSong(index);
            document.getElementById('bottom-cover').src = songs[index].cover;
            document.getElementById('bottom-song-name').innerText = songs[index].songName;
           
        });
    });
    function changeSong(index) {
        audio.src = songs[index].location;
        audio.load();
        play = true;
        playButton.style.opacity = 1;
        audio.play();
        songIndex =index;
       
    }
    audio.addEventListener('ended', function() {
        songIndex = (songIndex + 1) % songs.length;
        playCurrentSong();
    });
    let nextButton = document.getElementById('next');

    nextButton.addEventListener('click', function() {
        songIndex = (songIndex + 1) % songs.length;
        playCurrentSong();
    });
    let prevButton = document.getElementById('prev');

    prevButton.addEventListener('click', function() {
        songIndex = (songIndex - 1) % songs.length;
        playCurrentSong();
    });

    function playCurrentSong() {
        audio.src = songs[songIndex].location;
        audio.load();
        audio.play();
        play = true;
        updateBottomBar(songIndex);
    }
    function updateBottomBar(index) {
        document.getElementById('bottom-cover').src = songs[index].cover;
        document.getElementById('bottom-song-name').innerText = songs[index].songName;
       
    }
    
    
    audio.addEventListener('timeupdate', function(){
      updateStarttime();  
      updateProgressBar();
    })
    audio.addEventListener('loadedmetadata', function() {
        updateEndtime();
        updateStarttime();
    });
    function updateStarttime() {
        let startTimeSpan = document.getElementById('start-time');
        const currentTime = audio.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        startTimeSpan.textContent = formattedTime;
    }
    progressBar.addEventListener('input', function () {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
        updateStarttime();
    });
    function updateEndtime(){
        const totalTime = audio.duration;
        const endMinutes = Math.floor(totalTime / 60);
        const endSeconds = Math.floor(totalTime % 60);
        const endformattedTime = `${endMinutes}:${endSeconds < 10 ? '0' : ''}${endSeconds}`;
        const endTime = document.getElementById('end-time');
        endTime.textContent = endformattedTime;
    }
    function updateProgressBar(){
        const progressBar = document.getElementById('progress-bar');
        const value = (audio.currentTime / audio.duration) * 100;
        progressBar.value = value;
        progressBar.style.background = `linear-gradient(to right, #1DB954 0%, #1DB954 ${value}%, #d3d3d3 0%, #d3d3d3 100%)`;
    }
});
