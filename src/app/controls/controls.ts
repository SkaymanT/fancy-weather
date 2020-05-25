import ControlsButtons from './controls-buttons';
import Search from './search';

export default class Controls {
  search: Search;
  controlsButtons: ControlsButtons;
  doChanges: Function;
  controlsContainer: any;

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
    this.search = new Search(doChanges);
    this.controlsButtons = new ControlsButtons(doChanges);
  }

  render() {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.classList.add('controls-container');
    this.controlsContainer.append(this.controlsButtons.render());
    this.controlsContainer.append(this.search.render());

    // this.controlsContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.controlsContainer;
  }

  handlerClick(event) {
    
  }

 
}