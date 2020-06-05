import Search from '../src/app/controls/search';

describe('Scale test click on buttons', () => {
  function doChanges(t: string) {
    expect(testContainer.querySelector('.droplist-base>span').innerHTML).toEqual(t);
  }
  let listLanguage = ['test1', 'test2', 'test3'];
  let max = 3;
  let test = new Search(doChanges);
  let testContainer = test.render(listLanguage);

  it('Search null', () => {
    for (let i = 0; i < listLanguage.length; ++i) {
      let searchinput = testContainer.querySelector('.search-input') as HTMLInputElement;
      
      let buttonClick = testContainer.querySelector('.search-input__button') as HTMLButtonElement;
      buttonClick.click();
      expect(testContainer.querySelector('.drop-down-menu').classList.contains('drop-down-menu--open')).toEqual(true);
      let buttonsMenu = testContainer.querySelector(`#${listLanguage[i]}`) as HTMLButtonElement;
      buttonsMenu.click();
      expect(buttonsMenu.classList.contains('inactive')).toEqual(false);
      test.doChanges(testContainer.querySelector('.droplist-base>span').innerHTML);
    }
  });
});