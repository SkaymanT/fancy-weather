export default class TemperatureScale {
  doChanges: Function;
  temperatureScale: HTMLDivElement;
  list: string[] = ['°F', '°C'];

  constructor(doChanges: Function) {
    this.doChanges = doChanges;
  }

  public render(): HTMLDivElement {
    this.temperatureScale = document.createElement('div');
    this.temperatureScale.classList.add('buttons-scale');
    this.list.forEach(element => {
      const scaleButton = document.createElement('button');
      scaleButton.classList.add(`button--${element.slice(1).toLowerCase()}`);
      scaleButton.classList.add('button');
      scaleButton.classList.add('inactive');
      scaleButton.innerText = element;
      this.temperatureScale.append(scaleButton);
    });
    if (localStorage.scale) {
      this.temperatureScale.querySelector(`.button--${localStorage.getItem('scale').substr(2, 1).toLowerCase()}`).classList.remove('inactive');
    } else {
      this.temperatureScale.querySelector(`.button--${this.list[1].slice(1).toLowerCase()}`).classList.remove('inactive');
    }
    this.temperatureScale.addEventListener('click', (event) => this.handlerClick(event));

    return this.temperatureScale;
  }

  private handlerClick(event): void {
    if (this.isClickButtonScale(event)) {
      this.clickButtonScale(event);
    }
  }
  private isClickButtonScale(event): boolean {
    return event.target.classList.contains('button--c') || event.target.classList.contains('button--f');
  }

  async clickButtonScale(event): Promise<string> {
    this.list.forEach(element => {
      console.log(this.temperatureScale.querySelector(`.button--${element.slice(1).toLowerCase()}`));
      this.temperatureScale.querySelector(`.button--${element.slice(1).toLowerCase()}`).classList.add('inactive');
    });
    localStorage.setItem('scale', JSON.stringify(event.target.innerHTML));
    event.target.classList.remove('inactive');
    await this.doChanges();
    return 'end';
  }
}