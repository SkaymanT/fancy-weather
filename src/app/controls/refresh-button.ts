export default class RefreshButton {
  doChanges: Function;
  refreshButton: HTMLButtonElement;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(): HTMLButtonElement {
    this.refreshButton = document.createElement('button');
    this.refreshButton.classList.add('button-refresh');
    this.refreshButton.classList.add('button');
    const spinnerButton = document.createElement('div');
    spinnerButton.classList.add('spinner');
    this.refreshButton.append(spinnerButton);

    this.refreshButton.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.refreshButton;
  }

  private handlerClick(event) {
    if (this.isClickButtonRefresh(event)) {
      this.clickButtonRefresh(event);
    }
  }

  private isClickButtonRefresh(event): boolean {
    return event.target.classList.contains('spinner') || event.target.classList.contains('button-refresh');
  }

  private clickButtonRefresh(event): void {
    console.log(event.target);
    console.log(document.querySelector('.spinner'));
    this.refreshButton.querySelector('.spinner').animate([
      // keyframes
      { transform: 'translate3D(0, 0, 0)' },
      { transform: 'translate3D(0, -300px, 0)' }
    ], {
      // timing options
      duration: 1000,
      iterations: Infinity
    });
    console.log('sss');
  }
}