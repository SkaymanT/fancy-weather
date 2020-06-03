export default class Notify {
  notifyContainer: HTMLDivElement;
  content: Array<string>;
  constructor() {
    this.notifyContainer = document.createElement('div');
  }

  public render(): HTMLDivElement {
    this.notifyContainer.addEventListener('click', (event) => this.handlerClick(event));
    return this.notifyContainer;
  }

  public openMessage(content: string, typeContent: string): void {
    this.notifyContainer.classList.add('notify');
    this.notifyContainer.classList.add(`notify_${typeContent}`);
    let notify = document.createElement('div');
    notify.classList.add('notify__text');
    notify.innerText = content;
    this.notifyContainer.append(notify);

    let notifyClose = document.createElement('button');
    notifyClose.classList.add(`notify__close_${typeContent}`);
    notifyClose.innerText = '×';
    this.notifyContainer.append(notifyClose);
    setTimeout(this.closeMessage.bind(this), 4000);
  }


  private closeMessage(): void {
    this.notifyContainer.classList.remove('notify');
    this.notifyContainer.innerHTML = '';
  }


  private handlerClick(event): void {
    if (this.isClickButtonClose(event)) {
      this.clickButtonSpeak(event);
    }
  }

  private isClickButtonClose(event): boolean {
    return event.target.classList.contains('notify__close');
  }

  private clickButtonSpeak(event): void {
    this.closeMessage();
  }

}