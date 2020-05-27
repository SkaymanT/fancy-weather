export default class Micro {
  recognition: any;
  doChanges: Function;

  constructor(doChanges) {
    this.doChanges = doChanges;
    const SpeechRecognitionConstructor = window.SpeechRecognition || (<any>window).webkitSpeechRecognition;
    this.recognition = new SpeechRecognitionConstructor();
  }

  public getMicro(): HTMLButtonElement {
    const buttonMicro = document.createElement('button');
    buttonMicro.classList.add('button-micro');
    return buttonMicro;
  }

  public onMicro(input): void {
    document.querySelector('.button-micro').classList.add('active');
    this.recognition.start();
    let word = '';
    this.recognition.addEventListener('result', e => {
      const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      word = transcript.toLowerCase();
      input.value = word;
      this.getSearch(word);
    });
    this.recognition.addEventListener('end', this.recognition.start);
  }

  public checkedisOnMicro(searchContainer: HTMLDivElement): boolean {
    return !searchContainer.querySelector('.button-micro').classList.contains('active')
  }


  public offMicro(): void {
    document.querySelector('.button-micro').classList.remove('active');
    this.recognition.stop();
    this.recognition.removeEventListener('end', this.recognition.start);
  }

  private getSearch(text): void {
    this.offMicro();
    document.querySelector('.button-micro').classList.remove('active');
    this.doChanges(text);
  }
}