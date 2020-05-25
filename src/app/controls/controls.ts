import ControlsButtons from './controls-buttons';
import Search from './search';

export default class Controls {

  constructor(doChanges) {
    this.search = new Search();
    this.controlsButtons = new ControlsButtons();
    this.doChanges = doChanges;
  }

  render() {
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.classList.add('controls-container');
    
    this.controlsContainer.append(this.search.render());
    this.controlsContainer.append(this.controlsButtons.render());

    this.controlsContainer.addEventListener('click', (event) => this.handlerClick(event));
    // document.addEventListener('keydown', (e) => this.handlerClickKeyboard(e));

    return this.controlsContainer;
  }

  handlerClick(event) {
    
  }

 
}