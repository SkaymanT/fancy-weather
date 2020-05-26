export default class RefreshButton {
  doChanges: Function;
  refreshButton: HTMLButtonElement;
  list: string[] = ['en', 'ru', 'be'];

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

    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.refreshButton;
  }

  handlerClick() {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }
}