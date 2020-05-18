
export default class ControlsButtons {

  constructor(doChange) {
    this.ControlsButtons = doChange;
  }

  render() {
    this.searchContainer = document.createElement('div');
    this.searchContainer.classList.add('controls-btns-container');

    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.searchContainer;
  }

  handlerClick(event) {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }

 
}