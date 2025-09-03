const audioPlayer = document.getElementById('audio-player');
const songInfos = document.querySelectorAll('.song-info');
const radios = document.querySelectorAll('input[name="slider"]');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pauseBtn = document.getElementById('pause');

let currentSongIndex = 0;

function loadSong(index) {
    songInfos.forEach(info => info.classList.remove('active'));

    const selectedInfo = songInfos[index];
    selectedInfo.classList.add('active');

    const audioSrc = selectedInfo.getAttribute('data-audio');
    audioPlayer.src = audioSrc;
    audioPlayer.play().catch(() => {
        // autoplay error if not triggered by user
    });

    radios[index].checked = true;
    currentSongIndex = index;

    pauseBtn.textContent = '▐▐';
}

// Play/pause toggle
pauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        pauseBtn.textContent = '▐▐';
    } else {
        audioPlayer.pause();
        pauseBtn.textContent = '▶';
    }
});

// Next/prev controls
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songInfos.length;
    loadSong(currentSongIndex);
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songInfos.length) % songInfos.length;
    loadSong(currentSongIndex);
});

// Change song when clicking on a card (radio)
radios.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        loadSong(index);
    });
});

// On first load
window.onload = () => {
    loadSong(0);
};

// Optional: modal popup
function closeModal() {
    document.getElementById('notificationModal').style.display = 'none';
}