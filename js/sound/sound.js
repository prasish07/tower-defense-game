// sound variable
// bg
let sound;
// tower landing
let landing;
// firing
let gun;

// tower being attack sound
let towerSound;

// function to add sound
function playSound(sound, loop) {
  let audio = new Audio(sound);
  audio.loop = loop;
  audio.play();
  return audio;
}

// Function to stop sound
function stopSound(audio) {
  audio.pause();
  audio.currentTime = 0; // Reset the time to the beginning
}
