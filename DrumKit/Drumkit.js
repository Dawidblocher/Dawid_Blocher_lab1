const clapSound = document.querySelector('#clap');
const boomSound = document.querySelector('#boom');
const hihatSound = document.querySelector('#hihat');
const kickSound = document.querySelector('#kick');
const openhatSound = document.querySelector('#openhat');
const rideSound = document.querySelector('#ride');
const snareSound = document.querySelector('#snare');
const tinkSound = document.querySelector('#tink');
const tomSound = document.querySelector('#tom');

class Drumkit {

    constructor(btnRec, btnPlay) {
        this.channel = []
        this.channelStartTime = null
        this.channelRecording = false
        this.btnRec = document
            .querySelector(`${btnRec}`)
        document
            .querySelector(btnPlay)
            .addEventListener('click', this.playRecord);

        this.btnRec.addEventListener('click', this.startRecording);
        document.body.addEventListener('keypress', this.playAudio);
    }

    playAudio = (e) => {
        if (this.channelRecording) {
            this.channel.push({
                code: e.code,
                time: Date.now(),
            })
        }
        this.playSound(e.code);
    }

    startRecording = () => {
        this.channelRecording = !this.channelRecording;
        if (this.channelRecording) {
            this.channel.splice(0);
            this.channelStartTime = Date.now();
        }
        this.btnRec.innerHTML = `${this.channelRecording ? '<i class="fas fa-microphone-alt-slash"></i>' : '<i class="fas fa-microphone-alt"></i>'}`;
    }

    playRecord = () => {
        this.channelRecording = false;
        this.btnRec.innerHTML = '<i class="fas fa-microphone-alt"></i>';
        this.channel
            .forEach(el => {
                setTimeout(this.playSound, el.time - this.channelStartTime, el.code);
            })
    }

    playSound = (code) => {
        switch (code) {
            case 'KeyA':
                clapSound.currentTime = 0;
                clapSound.play();
                break
            case 'KeyS':
                boomSound.currentTime = 0;
                boomSound.play();
                break
            case "KeyD":
                hihatSound.currentTime = 0;
                hihatSound.play();
                break
            case "KeyF":
                kickSound.currentTime = 0;
                kickSound.play();
                break
            case "KeyG":
                openhatSound.currentTime = 0;
                openhatSound.play();
                break
            case "KeyH":
                rideSound.currentTime = 0;
                rideSound.play();
                break
            case "KeyJ":
                snareSound.currentTime = 0;
                snareSound.play();
                break
            case "KeyK":
                tinkSound.currentTime = 0;
                tinkSound.play();
                break
            case "KeyL":
                tomSound.currentTime = 0;
                tomSound.play();
                break
        }
    }
}

const drum = new Drumkit('#channel1rec', '#channel1play');
const drum2 = new Drumkit('#channel2rec', '#channel2play');
const drum3 = new Drumkit('#channel3rec', '#channel3play');
const drum4 = new Drumkit('#channel4rec', '#channel4play');