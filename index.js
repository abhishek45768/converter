let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceChange = document.querySelector('select');

// Function to populate voices when the page loads
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voices.forEach((voice, i) => {
        voiceChange.options[i] = new Option(voice.name, i);
    });
}

// Check if voices are already available
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
} else {
    // If onvoiceschanged is not supported, populate voices immediately
    populateVoices();
}

document.querySelector('button').addEventListener('click', () => {
    let selectedVoiceIndex = voiceChange.value;
    speech.text = document.querySelector('textarea').value;
    if (selectedVoiceIndex >= 0 && selectedVoiceIndex < voices.length) {
        speech.voice = voices[selectedVoiceIndex];
        window.speechSynthesis.speak(speech);
    } else {
        alert('Please select a voice from the dropdown.');
    }
});
