// script.js

window.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause-button');

    if (audio && playPauseButton) {
        let isPlaying = false;
        audio.volume = 0.5; // Set volume to 50%

        playPauseButton.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playPauseButton.textContent = 'Play Music';
            } else {
                audio.play().then(() => {
                    playPauseButton.textContent = 'Pause Music';
                }).catch(error => {
                    console.error("Audio playback failed:", error);
                    // Reset state if play fails
                    isPlaying = false;
                    playPauseButton.textContent = 'Play Music';
                });
            }
            // This line toggles the state *after* attempting play/pause
            // Important: It should reflect the *intended* state unless an error occurs
             if (audio.paused && isPlaying) {
                 // If audio got paused unexpectedly or play failed, reset state
                 isPlaying = false;
             } else if (!audio.paused && !isPlaying) {
                  // If audio started playing successfully
                  isPlaying = true;
             } else {
                 // Toggle state if no errors/unexpected pauses
                 isPlaying = !isPlaying;
             }

        });

        audio.addEventListener('ended', () => {
            if (!audio.loop) {
                isPlaying = false;
                playPauseButton.textContent = 'Play Music';
            }
        });

    } else {
        console.error('Could not find audio element or play/pause button.');
    }
});