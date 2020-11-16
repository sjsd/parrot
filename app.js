const btn = document.querySelector('.talk');
const content = document.querySelector('.content');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    console.log('Voice is activated, As I rock, rock, rock, rock, rock the microphone');
    btn.classList.add('active');
    btn.setAttribute('disabled', 'disabled');
};

recognition.onspeechend = () => {
    console.log('Carry on with the freestyler');
    btn.classList.remove('active');
    btn.removeAttribute('disabled');
};

recognition.onresult = (event) => {
    console.log(event);
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    content.textContent = transcript;
    parrot(transcript);
}

// Parrot
parrot = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.text = message;

    if (message.includes('klokka')) {
        var time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        speech.text = 'Klokka er ' + h + ':' + m;
        content.textContent = speech.text;
    }

    window.speechSynthesis.speak(speech);
 }


// Add eventlistener to the button
btn.addEventListener('click', () => {
    recognition.start();
});
