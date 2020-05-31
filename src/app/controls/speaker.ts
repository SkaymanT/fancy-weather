export default class Speaker {

  textSpeaker: string;
  responsiveVoice: any;
  constructor(text) {
    this.textSpeaker = text;
  }

  public getSpeaker(): HTMLButtonElement {
    const buttonSpeaker = document.createElement('button');
    buttonSpeaker.classList.add('button-speaker');
    buttonSpeaker.classList.add('button');
    const spinnerButton = document.createElement('div');
    spinnerButton.classList.add('speaker');
    buttonSpeaker.append(spinnerButton);
    buttonSpeaker.addEventListener('click', (event) => this.handlerClick(event));
    return buttonSpeaker;
  }

  public onSpeaker(text): void {
    responsiveVoice.speak(text, "UK English Male", { volume: 1 });
    // let voices = speechSynthesis.getVoices();
    // let utterance = new SpeechSynthesisUtterance(text);
    // utterance.voice = voices[4];
    // speechSynthesis.speak(utterance);
  }

  private handlerClick(event): void {
    if (this.isClickButtonSpeak(event)) {
      this.clickButtonSpeak(event);
    }
  }

  private isClickButtonSpeak(event): boolean {
    return event.target.classList.contains('speaker') || event.target.classList.contains('button-speaker');
  }

  private clickButtonSpeak(event): void {
    this.onSpeaker(this.textSpeaker);
  }

}