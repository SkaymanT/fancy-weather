export default class ControlsButtons {
  doChanges: Function;
  controlsButtons: any;
  list: string[] = ['en', 'ru', 'be'];

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render() {
    this.controlsButtons = document.createElement('div');
    this.controlsButtons.classList.add('controls-btns-container');
    this.controlsButtons.classList.add('container');
    this.controlsButtons.append(this.initRefreshBg());
    this.controlsButtons.append(this.initLanguage(this.list));
    this.controlsButtons.append(this.initRadioTemp());
    // this.searchContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.controlsButtons;
  }

  handlerClick(event) {
    // if (this.isClickButtonСlear(event)) {
    //   this.clickButtonСlear();
    // }
  }

  private initRefreshBg(){
    const refreshButton = document.createElement('div');
    refreshButton.classList.add('button-background');
    refreshButton.classList.add('button-base');
    let keyValue = '<img src="assets/img/refresh_icon.svg" class="controls-container--btn_icon" alt="refresh">';
    refreshButton.insertAdjacentHTML('beforeend', keyValue);
    return refreshButton;
  }

  private initLanguage(array:string[]): any{
    const buttonDroplist = document.createElement('div');
    buttonDroplist.classList.add('button-droplist');
    const selectDroplist = document.createElement('select');
    selectDroplist.classList.add('droplist-base');
    array.forEach(element => {
      let keyValue = `<option style="background-color: gray;">${element}</option>`;
      selectDroplist.insertAdjacentHTML('beforeend', keyValue);
    });
    buttonDroplist.append(selectDroplist);
    return buttonDroplist;
  }

  private initRadioTemp(){
    const buttonRadioTemp = document.createElement('div');
    buttonRadioTemp.classList.add('button-radio');
    buttonRadioTemp.classList.add('container');
    const radioButtonF = document.createElement('div');
    radioButtonF.classList.add('button-temp-f');
    radioButtonF.classList.add('button-base');
    radioButtonF.innerText='°F';
    const radioButtonC = document.createElement('div');
    radioButtonC.classList.add('button-temp-c');
    radioButtonC.classList.add('button-base');
    radioButtonC.innerText='°C';
    const checkButton = document.createElement('div');
    checkButton.classList.add('radio-flap');
    checkButton.classList.add('radio-flap-check');
    buttonRadioTemp.append(radioButtonF);
    buttonRadioTemp.append(radioButtonC);
    buttonRadioTemp.append(checkButton);
    return buttonRadioTemp;
  }


 
}